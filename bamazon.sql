drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products (
    item_id int (30) auto_increment not null,
    product_name varchar (255) null,
    department_name varchar (255) null,
    price decimal (10,2) not null,
    stock_quantity int (255) null,
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Twix", "Miscellaneous", 1.25, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("Fancy Watch", "Fashion", 87.99, 14);

insert into products (product_name, department_name, price, stock_quantity)
values ("Adorable Socks", "Fashion", 3.49, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("Breakable Glasses", "Fun", 4.56, 99);

insert into products (product_name, department_name, price, stock_quantity)
values ("VR Headset", "Technology", 399.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Plug-in Speakers", "Tehcnology", 125.99, 12);
insert into products (product_name, department_name, price, stock_quantity)
values ("Super Wide Monitor", "Technology", 379.95, 15);

insert into products (product_name, department_name, price, stock_quantity)
values ("Leather Notebook", "Miscellaneous", 8.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Electric Wheel", "Transportation", 499.99, 6);

insert into products (product_name, department_name, price, stock_quantity)
values ("Calendars", "Miscellaneous", 5.00, 100);

