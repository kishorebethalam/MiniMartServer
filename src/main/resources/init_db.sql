drop database pos;
create database pos;
connect pos;

create table if not exists category (
	id int not null primary key auto_increment,
	name varchar(128),
	parent_category_id int not null default 0
);

create table if not exists manufacturer (
	id int not null primary key auto_increment,
	name varchar(128)
);


create table if not exists brand (
	id int not null primary key auto_increment,
	name varchar(128),
	manufacturer_id int not null,
	foreign key (manufacturer_id) references manufacturer(id)
);

create table if not exists product_master (
	id int not null primary key auto_increment,
	name varchar(128),
	brand_id int not null,
	category_id int not null,
	foreign key (brand_id) references brand(id),
	foreign key (category_id) references category(id)
);

create table if not exists product (
	id int not null primary key auto_increment,
	product_master_id int not null,
	measurement_category varchar(32),
	measurement_quantity int not null,
	mrp float not null,
	sell_price float not null,
	buy_price float not null,
	reorder_volume int not null,
	reorder_frequency varchar(32) not null,
	foreign key (product_master_id) references product_master(id)
);

create table if not exists inventory_item (
	id int not null primary key auto_increment,
	product_id int not null,
	tracking_code varchar(32),
	quantity int not null,
	received_date timestamp not null,
	expiry_date timestamp,
	promotional_offer varchar(256),
	foreign key (product_id) references product(id)

);
delete from inventory_item where id = 1;
delete from product where id = 1;
delete from product_master where id = 1;
delete from category where id = 1;
delete from brand where id = 1;
delete from manufacturer where id = 1;

insert into manufacturer(id,name) values (1, 'TestManufacturer');
insert into brand (id, manufacturer_id, name) values (1, 1, 'TestBrand');
insert into category (id, name, parent_category_id) values (1, 'Test Category', 1);
insert into product_master (id, name, brand_id, category_id) values (1, 'Test Product Master', 1, 1);
insert into product (id, product_master_id, measurement_category, measurement_quantity, mrp, sell_price, buy_price, reorder_volume, reorder_frequency)  values (1, 1, 'Test Measurement Category', 100, 50.0, 75.0, 35.0, 1, '1 Week');
insert into inventory_item ( id, product_id,  tracking_code, quantity, promotional_offer)  values (1, 1,'123456789', 10, '1+1');
