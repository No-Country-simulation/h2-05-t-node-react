// src/database/createDatabaseStructures.ts
import { Sequelize } from "sequelize-typescript";

export async function createDatabaseStructures(sequelize: Sequelize) {
  try {
    const createViewQuery = `
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_views WHERE viewname = 'predictions_match_prediction') THEN
          CREATE VIEW predictions_match_prediction AS
          SELECT 
            predictions.id AS bet_id,
            predictions.user_id,
            predictions.type AS bet_type,
            predictions.bet_points,
            predictions.date AS bet_date,
            predictions.status AS bet_status,
            predictions.total_points,
            prediction_info.id AS prediction_info_id,
            prediction_info."predictionType",
            prediction_info."predictionQuotaType",
            prediction_info."selectedPredictionType",
            prediction_info.fee,
            prediction_info.prediction_date,
            prediction_info.status AS prediction_status,
            matches.id AS match_id,
            matches.home_team,
            matches.away_team,
            matches.match_date,
            matches.result,
            matches."id_apiMatch",
            matches.status AS match_status
          FROM 
            predictions
          JOIN 
            prediction_info ON predictions.id = prediction_info.prediction_id
          JOIN 
            matches ON prediction_info.match_id = matches.id;
        END IF;
      END
      $$;
    `;

    const createFunctionQuery = `
    CREATE OR REPLACE FUNCTION update_bet_status() RETURNS TRIGGER AS $$
    DECLARE
      pred_type VARCHAR(255);
    BEGIN
      -- Verificar si el campo 'result' fue modificado
      IF NEW."result" IS DISTINCT FROM OLD."result" THEN
        SELECT "selectedPredictionType" INTO pred_type
        FROM "prediction_info"
        WHERE "match_id" = NEW."id";
  
        -- Verificar si el selectedPredictionType coincide con el nuevo result
        IF pred_type = NEW."result" THEN
          -- Actualizar el estatus de la apuesta a 'successful'
          UPDATE "bets"
          SET "status" = 'successful'
          WHERE "id" = (SELECT "prediction_id" FROM "prediction_info" WHERE "match_id" = NEW."id");
        ELSE
          -- Actualizar el estatus de la apuesta a 'failed'
          UPDATE "bets"
          SET "status" = 'failed'
          WHERE "id" = (SELECT "prediction_id" FROM "prediction_info" WHERE "match_id" = NEW."id");
        END IF;
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;

    const dropTriggerQuery = `
  DROP TRIGGER IF EXISTS after_match_result_update ON "matches";
`;

    const createTriggerQuery = `
  CREATE TRIGGER after_match_result_update
  AFTER UPDATE OF "result" ON "matches"
  FOR EACH ROW
  EXECUTE FUNCTION update_bet_status();
`;

    // Ejecutar las consultas sin procesar
    await sequelize.query(createViewQuery);
    await sequelize.query(createFunctionQuery);
    await sequelize.query(dropTriggerQuery);
    await sequelize.query(createTriggerQuery);

    console.log(
      "Vista, función y trigger creados exitosamente si no existían."
    );
  } catch (error) {
    console.error("Error al crear la vista, función o trigger:", error);
  }
}
