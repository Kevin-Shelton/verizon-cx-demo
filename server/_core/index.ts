import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Email experience content for each persona
  const emailContent: Record<string, string> = {
    carlos: `<h1>Email Experience - Dialect-Specific Communication</h1>
<p>This is a demonstration of how dialect-specific Spanish translation enhances email communication with customers.</p>

<div class="email-preview">
  <div class="subject">Asunto: Tu nuevo plan de servicio esta listo</div>
  <div class="body">
    <p>Hola Carlos!</p>
    <p>Nos complace informarte que tu nuevo plan de servicio ha sido activado exitosamente. Como propietario de negocio, entendemos la importancia de mantener tu operacion funcionando sin interrupciones.</p>
    <p>Tu nuevo plan incluye:</p>
    <ul>
      <li>5 lineas de negocio con datos ilimitados</li>
      <li>Soporte prioritario 24/7</li>
      <li>Descuento especial para pequenos negocios</li>
    </ul>
    <p>Si tienes alguna pregunta, nuestro equipo de soporte esta disponible en espanol.</p>
    <p>Gracias por confiar en Verizon!</p>
  </div>
</div>
<p><em>This email demonstrates culturally-aware Spanish translation tailored to Mexican Spanish dialect preferences.</em></p>`,

    maria: `<h1>Email Experience - Dialect-Specific Communication</h1>
<p>This is a demonstration of how dialect-specific Spanish translation enhances email communication with customers.</p>

<div class="email-preview">
  <div class="subject">Asunto: Tu nuevo plan de servicio está listo</div>
  <div class="body">
    <p>¡Hola María!</p>
    <p>Nos complace informarle que su nuevo plan de servicio ha sido activado exitosamente. Como gerente de servicios de campo, entendemos la importancia de mantener sus operaciones funcionando sin interrupciones.</p>
    <p>Su nuevo plan incluye:</p>
    <ul>
      <li>10 líneas de servicio con datos ilimitados</li>
      <li>Soporte prioritario 24/7 en español</li>
      <li>Descuento especial para empresas de servicios</li>
    </ul>
    <p>Si tiene alguna pregunta, nuestro equipo de soporte está disponible en español.</p>
    <p>¡Gracias por confiar en Verizon!</p>
  </div>
</div>
<p><em>This email demonstrates culturally-aware Spanish translation tailored to Caribbean Spanish dialect preferences.</em></p>`,

    lucia: `<h1>Email Experience - Dialect-Specific Communication</h1>
<p>This is a demonstration of how dialect-specific Spanish translation enhances email communication with customers.</p>

<div class="email-preview">
  <div class="subject">Asunto: Tu nuevo plan de servicio está listo</div>
  <div class="body">
    <p>¡Hola Lucía!</p>
    <p>Nos complace informarle que su nuevo plan de servicio ha sido activado exitosamente. Como administradora de clínica de salud, entendemos la importancia de mantener sus operaciones funcionando sin interrupciones.</p>
    <p>Su nuevo plan incluye:</p>
    <ul>
      <li>Líneas de negocio con datos ilimitados</li>
      <li>Soporte prioritario 24/7 en español</li>
      <li>Descuento especial para instituciones de salud</li>
    </ul>
    <p>Si tiene alguna pregunta, nuestro equipo de soporte está disponible en español.</p>
    <p>¡Gracias por confiar en Verizon!</p>
  </div>
</div>
<p><em>This email demonstrates culturally-aware Spanish translation tailored to Latin American Spanish dialect preferences.</em></p>`,

    diego: `<h1>Email Experience - Dialect-Specific Communication</h1>
<p>This is a demonstration of how dialect-specific Spanish translation enhances email communication with customers.</p>

<div class="email-preview">
  <div class="subject">Asunto: Tu nuevo plan de servicio está listo</div>
  <div class="body">
    <p>¡Hola Diego!</p>
    <p>Nos complace informarle que su nuevo plan de servicio ha sido activado exitosamente. Como gerente de proyectos de construcción, entendemos la importancia de mantener sus operaciones funcionando sin interrupciones.</p>
    <p>Su nuevo plan incluye:</p>
    <ul>
      <li>Líneas de negocio con datos ilimitados</li>
      <li>Soporte prioritario 24/7 en español</li>
      <li>Descuento especial para empresas de construcción</li>
    </ul>
    <p>Si tiene alguna pregunta, nuestro equipo de soporte está disponible en español.</p>
    <p>¡Gracias por confiar en Verizon!</p>
  </div>
</div>
<p><em>This email demonstrates culturally-aware Spanish translation tailored to US Spanish dialect preferences.</em></p>`,
  };

  // Field services content for each persona
  const fieldServicesContent: Record<string, string> = {
    carlos: `<h1>Field Services Experience - On-Site Support</h1>
<p>This demonstrates how field service representatives communicate with customers using dialect-specific Spanish.</p>

<div class="service-card">
  <div class="service-title">Servicio de Instalacion - Installation Service</div>
  <div class="service-desc">
    <p>El tecnico de Verizon llegara a tu ubicacion entre las 2:00 PM y 5:00 PM.</p>
    <p>Verizon technician will arrive at your location between 2:00 PM and 5:00 PM.</p>
    <p><strong>Lo que necesitas saber:</strong></p>
    <ul>
      <li>Tiempo estimado: 1-2 horas</li>
      <li>Se instalaran 5 lineas de negocio</li>
      <li>El tecnico llevara todos los equipos necesarios</li>
    </ul>
  </div>
</div>

<div class="service-card">
  <div class="service-title">Soporte Tecnico - Technical Support</div>
  <div class="service-desc">
    <p>Nuestro equipo de soporte esta disponible para ayudarte en espanol durante y despues de la instalacion.</p>
    <p>Our support team is available to assist you in Spanish during and after installation.</p>
  </div>
</div>
<p><em>This experience demonstrates culturally-aware field service communication in Mexican Spanish.</em></p>`,

    maria: `<h1>Field Services Experience - On-Site Support</h1>
<p>This demonstrates how field service representatives communicate with customers using dialect-specific Spanish.</p>

<div class="service-card">
  <div class="service-title">Servicio de Instalación - Installation Service</div>
  <div class="service-desc">
    <p>El técnico de Verizon llegará a su ubicación entre las 2:00 PM y 5:00 PM.</p>
    <p>Verizon technician will arrive at your location between 2:00 PM and 5:00 PM.</p>
    <p><strong>Lo que usted necesita saber:</strong></p>
    <ul>
      <li>Tiempo estimado: 1-2 horas</li>
      <li>Se instalarán 10 líneas de servicio</li>
      <li>El técnico llevará todos los equipos necesarios</li>
    </ul>
  </div>
</div>

<div class="service-card">
  <div class="service-title">Soporte Técnico - Technical Support</div>
  <div class="service-desc">
    <p>Nuestro equipo de soporte está disponible para ayudarle en español durante y después de la instalación.</p>
    <p>Our support team is available to assist you in Spanish during and after installation.</p>
  </div>
</div>
<p><em>This experience demonstrates culturally-aware field service communication in Caribbean Spanish.</em></p>`,

    lucia: `<h1>Field Services Experience - On-Site Support</h1>
<p>This demonstrates how field service representatives communicate with customers using dialect-specific Spanish.</p>

<div class="service-card">
  <div class="service-title">Servicio de Instalación - Installation Service</div>
  <div class="service-desc">
    <p>El técnico de Verizon llegará a su ubicación entre las 2:00 PM y 5:00 PM.</p>
    <p>Verizon technician will arrive at your location between 2:00 PM and 5:00 PM.</p>
    <p><strong>Lo que usted necesita saber:</strong></p>
    <ul>
      <li>Tiempo estimado: 1-2 horas</li>
      <li>Se instalarán líneas de negocio con datos ilimitados</li>
      <li>El técnico llevará todos los equipos necesarios</li>
    </ul>
  </div>
</div>

<div class="service-card">
  <div class="service-title">Soporte Técnico - Technical Support</div>
  <div class="service-desc">
    <p>Nuestro equipo de soporte está disponible para ayudarle en español durante y después de la instalación.</p>
    <p>Our support team is available to assist you in Spanish during and after installation.</p>
  </div>
</div>
<p><em>This experience demonstrates culturally-aware field service communication in Latin American Spanish.</em></p>`,

    diego: `<h1>Field Services Experience - On-Site Support</h1>
<p>This demonstrates how field service representatives communicate with customers using dialect-specific Spanish.</p>

<div class="service-card">
  <div class="service-title">Servicio de Instalación - Installation Service</div>
  <div class="service-desc">
    <p>El técnico de Verizon llegará a su ubicación entre las 2:00 PM y 5:00 PM.</p>
    <p>Verizon technician will arrive at your location between 2:00 PM and 5:00 PM.</p>
    <p><strong>Lo que usted necesita saber:</strong></p>
    <ul>
      <li>Tiempo estimado: 1-2 horas</li>
      <li>Se instalarán líneas de negocio con datos ilimitados</li>
      <li>El técnico llevará todos los equipos necesarios</li>
    </ul>
  </div>
</div>

<div class="service-card">
  <div class="service-title">Soporte Técnico - Technical Support</div>
  <div class="service-desc">
    <p>Nuestro equipo de soporte está disponible para ayudarle en español durante y después de la instalación.</p>
    <p>Our support team is available to assist you in Spanish during and after installation.</p>
  </div>
</div>
<p><em>This experience demonstrates culturally-aware field service communication in US Spanish.</em></p>`,
  };

  // Email experience routes
  app.get("/experiences/email/:persona", (req, res) => {
    const persona = req.params.persona;
    const content = emailContent[persona] || emailContent.carlos;
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Email Experience</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
          .container { max-width: 900px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
          h1 { color: #333; }
          .email-preview { background: #fafafa; border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 4px; }
          .subject { font-weight: bold; color: #0066cc; margin-bottom: 10px; }
          .body { color: #666; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          ${content}
        </div>
      </body>
      </html>
    `);
  });

  // Legacy route for backward compatibility
  app.get("/experiences/email", (req, res) => {
    res.redirect("/experiences/email/carlos");
  });

  // Field services experience routes
  app.get("/experiences/field-services/:persona", (req, res) => {
    const persona = req.params.persona;
    const content = fieldServicesContent[persona] || fieldServicesContent.carlos;
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Field Services Experience</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
          .container { max-width: 900px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
          h1 { color: #333; }
          .service-card { background: #f0f8ff; border-left: 4px solid #0066cc; padding: 15px; margin: 15px 0; border-radius: 4px; }
          .service-title { font-weight: bold; color: #0066cc; margin-bottom: 10px; }
          .service-desc { color: #666; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          ${content}
        </div>
      </body>
      </html>
    `);
  });

  // Legacy route for backward compatibility
  app.get("/experiences/field-services", (req, res) => {
    res.redirect("/experiences/field-services/carlos");
  });

  
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development" && process.env.VITE_DEV_SERVER === "true") {
    console.log("Setting up Vite development server...");
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

