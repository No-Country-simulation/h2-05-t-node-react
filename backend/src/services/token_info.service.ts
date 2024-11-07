import { TokenInfo } from "../models/token_info.model";

// Ruta para crear una nueva instancia del modelo
export const createTokenInfo = async (player: any, trophies: any) => {
  try {
    const playerInfo = await TokenInfo.create({
      division: player.division,
      name: player.name,
      photo: player.photo,
      total_tokens: player.total_tokens,
      burning_percentage: player.burning_percentage,
      age: player.age,
      position: player.position,
      games: player.games || 0,
      goals: player.goals || 0,
      assists_goals: player.assists_goals || 0,
      minutes_played: player.minutes_played || 0,
      cards_yellow: player.cards_yellow || 0,
      cards_red: player.cards_red || 0,
      achievements: trophies,
      apiId: player.apiId,
    });

    return playerInfo;
  } catch (error) {
    throw new Error(`Error al crear al jugador: ${(error as Error).message}`);
  }
};

export const getTokensInfos = async (): Promise<TokenInfo[]> => {
  try {
    const tokensInfo = await TokenInfo.findAll();
    if (!tokensInfo) throw new Error("Tokens no encontrados");
    return tokensInfo;
  } catch (error) {
    throw new Error(
      `Error al obtener las Predicciones: ${(error as Error).message}`
    );
  }
};

export const getTokenInfobyId = async (id: any): Promise<TokenInfo> => {
  try {
    const tokenInfo = await TokenInfo.findOne(id);
    if (!tokenInfo) throw new Error("Predicción no encontrados");
    return tokenInfo;
  } catch (error) {
    throw new Error(
      `Error al obtener las Predicciones: ${(error as Error).message}`
    );
  }
};

export const updateTokenInfobyId = async (id: any, data: any) => {
  try {
    const tokenInfo = await TokenInfo.update(data, { where: { id: id } });

    if (!tokenInfo) throw new Error("Informacion del token no actualizado");
    return { msg: "Informacion del token actualizada" };
  } catch (error) {
    throw new Error(
      `Error al actualizar la Informacion del token: ${
        (error as Error).message
      }`
    );
  }
};

export const deleteTokenInfoById = async (id: any) => {
  try {
    const tokenInfo = await TokenInfo.destroy({ where: { id: id } });

    if (!tokenInfo) throw new Error("Error al borrar la Informacion del token");

    return { msg: "Informacion del token eliminada" };
  } catch (error) {
    throw new Error(
      `Error al eliminar el token: ${(error as Error).message}`
    );
  }
};

export const tokenByName = async (name:any) => {
  try {
    const token = await TokenInfo.findOne({
      where: { name }
    });
    console.log(token);
    
    if (!token) throw new Error("Error al trear la Informacion del token");
    return token;
  } catch (error) {
    throw new Error(
      `Error al trear el token: ${(error as Error).message}`
    );
  }
}