/**
 * This function builds a URLSearchParams object from a given data object and then converts it into a string.
 * It iterates through each key-value pair in the object.
 * If the value is an array, it treats each array item as a new search parameter and appends it.
 * If the value is not an array and not null, it directly appends the value as a search parameter.
 *
 * @param data An object with string keys and unknown values, to be transformed into URL search parameters.
 * @return A string representing the URL search parameters.
 */
export function buildQueryParams(data: Record<string, unknown>): string {
    // Instantiate a new URLSearchParams object.
    const params = new URLSearchParams();
  
    // Iterate through each key-value pair in the data object.
    Object.entries(data).forEach(([key, value]) => {
        // If the value is an array, append each item in the array as a separate search parameter.
        if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v.toString()));
        } else if (value != null) {
            // If the value is not an array but is not null, directly append it as a search parameter.
            params.append(key, value.toString());
        }
    });
  
    // Transform the URLSearchParams object into a string and return this string.
    return params.toString();
}