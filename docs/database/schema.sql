-- docs\database\schema.sql

CREATE TABLE `favorite`(
    `id` INT(10) UNSIGNED NOT NULL,
    `id_furniture` INT(10) UNSIGNED NOT NULL,
    `id_user` INT(10) UNSIGNED NOT NULL,
    `is_favorite` TINYINT(1) NOT NULL
);
CREATE TABLE `furniture`(
    `id` INT(10) UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `id_type` INT(10) UNSIGNED NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `colour` VARCHAR(255) NOT NULL,
    `quantity` INT(11) NOT NULL,
    `price` DOUBLE NOT NULL,
    `status` ENUM(
        'Available',
        'Out of stock'
    ) NOT NULL
);
CREATE TABLE `furniture_type`(
    `id` INT(10) UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `furniture_material`(
    `id` INT(10) UNSIGNED NOT NULL,
    `id_furniture` INT(10) UNSIGNED NOT NULL,
    `id_material` INT(10) UNSIGNED NOT NULL
);
CREATE TABLE `image`(
    `id` INT(10) UNSIGNED NOT NULL,
    `id_furniture` INT(10) UNSIGNED NOT NULL,
    `url` VARCHAR(255) NOT NULL
);
CREATE TABLE `material`(
    `id` INT(10) UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `user`(
    `id` INT(10) UNSIGNED NOT NULL,
    `user_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM(
        'admin',
        'visitor',
        'customer',
        'seller'
    ) NOT NULL,
    PRIMARY KEY(`id`)
);
ALTER TABLE
    `favorite` ADD CONSTRAINT `favorite_id_furniture_foreign` FOREIGN KEY(`id_furniture`) REFERENCES `furniture`(`id`);
ALTER TABLE
    `favorite` ADD CONSTRAINT `favorite_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `user`(`id`);
ALTER TABLE
    `image` ADD CONSTRAINT `image_id_furniture_foreign` FOREIGN KEY(`id_furniture`) REFERENCES `furniture`(`id`);
ALTER TABLE
    `furniture_material` ADD CONSTRAINT `furniture_material_id_material_foreign` FOREIGN KEY(`id_material`) REFERENCES `material`(`id`);
ALTER TABLE
    `furniture` ADD CONSTRAINT `furniture_id_type_foreign` FOREIGN KEY(`id_type`) REFERENCES `furniture_type`(`id`);
ALTER TABLE
    `furniture` ADD CONSTRAINT `furniture_id_foreign` FOREIGN KEY(`id`) REFERENCES `furniture_material`(`id_furniture`);
