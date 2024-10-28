export const getFirstDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 2); // Restar un día
    return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };
  
export  const getSecondDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Restar un día
    return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };