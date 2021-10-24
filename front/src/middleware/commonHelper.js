
/**
 * Analyse la réponse retourné par axios, afin de traiter les cas d'erreur
 * et retourne la réponse du server quand tout se passe bien; null sinon
 * @param {any} response
 */
export function parseAxiosResponse(response) {
    if (!response) {
        return null;
    }
    if (response.status !== 200) {
        return null;
    }

    return response.data
}

/**
 * Retire les accents et les majuscules de la chaine de caratère
 * @param {string} value la chaine de caractère à nettoyer
 */
export function cleanString(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
