

export const formatTimeElapsed = (seconds:number) => {
    let minutes = Math.floor(seconds / 60); // Pega apenas os minutos, descartando os segundos;
    seconds -= (minutes * 60); //Mantém os minutos e recupera os segundos

    let secString = `${seconds < 10 ? '0'+seconds : seconds}` // Formata o 0 dos segundos menores que 10;
    let minString = `${minutes < 10 ? '0'+minutes : minutes}` // Formata o 0 dos segundos menores que 10;

    // Retorna os segundos e minutos formatados como string;
    return `${minString}:${secString}` 
}