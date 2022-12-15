CREATE OR REPLACE TRIGGER TG_CALCULAR_VALOR_TOTAL_PAGO
  AFTER INSERT ON CONCEPTO
  FOR EACH ROW 
  DECLARE V_TOTAL_CALC NUMBER;
BEGIN
    SELECT SUM(V_VALORCONCEP) INTO V_TOTAL_CALC from concepto where k_cuentacobro = 1;
    UPDATE PAGO
    SET V_TOTAL = V_TOTAL_CALC
    WHERE K_PAGO = NEW.K_PAGO;
END TG_CALCULAR_VALOR_TOTAL_PAGO;