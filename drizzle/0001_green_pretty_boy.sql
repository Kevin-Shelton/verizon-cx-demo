CREATE TABLE `feedback` (
	`id` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`userName` text,
	`userEmail` varchar(320),
	`type` enum('question','issue','improvement','observation') NOT NULL,
	`title` text,
	`description` text,
	`route` text,
	`personaId` varchar(64),
	`dialect` varchar(32),
	`activityId` varchar(128),
	`attachments` text,
	`metadata` text,
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transcripts` (
	`id` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`personaId` varchar(64),
	`dialect` varchar(32),
	`original` text,
	`translated` text,
	`sentiment` varchar(32),
	`source` varchar(64),
	`hash` varchar(128),
	CONSTRAINT `transcripts_id` PRIMARY KEY(`id`)
);
