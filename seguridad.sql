ALTER SESSION SET "_ORACLE_SCRIPT"=true;

/*CREAR TABLESPACE ADMIN */

CREATE TABLESPACE adminprophorizontal 
DATAFILE 'D:\Oracle\oradata\XE\adminprophorizontal.dbf'
SIZE 2M AUTOEXTEND ON;

CREATE TEMPORARY TABLESPACE adminprophorizontaltemp 
TEMPFILE 'D:\Oracle\oradata\XE\adminprophorizontaltemp.dbf'
SIZE 2M AUTOEXTEND ON;

/*CREAR TABLESPACE USUARIOS */

CREATE TABLESPACE usuarioprophorizontal 
DATAFILE 'D:\Oracle\oradata\XE\usuarioprophorizontal.dbf'
SIZE 2M AUTOEXTEND ON;

CREATE TEMPORARY TABLESPACE usuarioprophorizontaltemp 
TEMPFILE 'D:\Oracle\oradata\XE\usuarioprophorizontaltemp.dbf'
SIZE 2M AUTOEXTEND ON;

/* CREAR USUARIOS */
/*---------------------------*/
/* - ADMIN */

CREATE USER adminConjunto IDENTIFIED BY adminConjunto 
DEFAULT TABLESPACE adminprophorizontal 
TEMPORARY TABLESPACE adminprophorizontaltemp QUOTA 2M 
ON adminprophorizontal;

/* PRIVILEGIOS */

GRANT connect, resource to adminConjunto;
/*---------------------------*/

/* - CREAR ROLES
   - ASIGNAR PRIVILEGIOS A ROLES
   - CREAR USUARIO
   - ASIGNAR ROL A USUARIO
*/
/*---------------------------*/
/* -  RESPONSABLE*/
CREATE ROLE responsable IDENTIFIED BY grantResponsable;

/* PRIVILEGIOS */
GRANT SELECT ON CUENTA_COBRO TO responsable;

/* USUARIO */
CREATE USER responsable1 IDENTIFIED BY responsable1 
DEFAULT TABLESPACE usuarioprophorizontal 
TEMPORARY TABLESPACE usuarioprophorizontaltemp QUOTA 2M 
ON usuarioprophorizontal;

/*ASIGNAR ROL*/
GRANT responsable TO responsable1;

/*---------------------------*/
/* -  SECRETARIA*/
CREATE ROLE secretaria IDENTIFIED BY grantSecretaria;

/* PRIVILEGIOS */
GRANT SELECT ON CUENTA_COBRO TO secretaria;

/* USUARIO */
CREATE USER secretaria1 IDENTIFIED BY secretaria1
DEFAULT TABLESPACE usuarioprophorizontal 
TEMPORARY TABLESPACE usuarioprophorizontaltemp QUOTA 2M 
ON usuarioprophorizontal;

/*ASIGNAR ROL*/
GRANT secretaria TO secretaria1;

/*---------------------------*/
/* -  CONTADOR*/
CREATE ROLE contador IDENTIFIED BY grantContador;

/* PRIVILEGIOS */
GRANT SELECT ON CUENTA_COBRO TO contador;

/* USUARIO */
CREATE USER contador1 IDENTIFIED BY contador1
DEFAULT TABLESPACE usuarioprophorizontal 
TEMPORARY TABLESPACE usuarioprophorizontaltemp QUOTA 2M 
ON usuarioprophorizontal;

/*ASIGNAR ROL*/
GRANT contador TO contador1;




