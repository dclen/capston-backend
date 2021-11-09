-- data.sql / schema.sql - Spring Boot will find it and use it

INSERT INTO user (Id, prefix, first_Name, last_Name, telephone_Number, address_Line1, address_Line2, city, postcode, vehicle_Type, engine_Size, additional_Drivers, used_For_Commercial, used_Outside_State, current_Value, date_Registered)
VALUES (1, 'Mrs', 'Bronagh', 'Doherty', '0123456789', '123 Main Street', 'Main Road', 'Magherafelt', 'BT45 5GW', 'Coupe', '1600','2', true, true, 50000, '2010-11-09'),
       (2, 'Mr', 'Dermot', 'Clenaghan', '0123456789', '124 Main Street', 'Main Road', 'Lisburn', 'BT9 5GW', 'Cabriolet', '200','2', true, false, 30000, '2010-10-10'),
       (3, 'Mr', 'Conor', 'Hawkins', '0123456789', '125 Main Street', 'Main Road', 'Belfast', 'BT8 5GW', 'Hatchback', '1400','4', false, true, 10000, '08/10/2002'),
       (4, 'Mr', 'Alex', 'ONeill', '0123456789', '126 Main Street', 'Main Road', 'Armagh', 'BT61 5GW', 'Estate', '2000','1', false, false, 35000, '05/12/2008');
