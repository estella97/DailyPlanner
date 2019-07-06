// Every API is in this form:
/**
 * {
 *  "<API Name>": {
 *   "name": "<name>"
 *   "input": {"<inputName>":"<inputType>"},
 *   "return": "<returnType>",
 *   "example": {<>:<>}
 *  }
 * }
 */

export const API = {
    plan : {
        "name": "plan",
        "input": {
            "time": "int",
            "commute": "string",
            "feelings": "object",
            "geoPoints": "object",
            "radius": "int"
        },
        "return": "object",
        "example": {
            "input": {
                "time": 2,
                "commute": "bus",
                "feelings": ["Happy", "Sad"],
                "geoPoints": {
                    "lat": 123.123,
                    "lon": 12.12
                },
                "radius": 100
            },
            "return": [
                {
                    "name": "Tims",
                    "spend": 0.5,
                    "location": "west mall"
                },
                {
                    "name": "CS Building",
                    "spend": 1.5,
                    "location": "east mall"
                }
            ]
        }
    },
}