# Server-side Implementation Details

## Available Place Types
More types: https://developers.google.com/places/web-service/supported_types
```javascript
["aquarium", "art_gallery", "bar", "beauty_salon", "book_store", "cafe", "clothing_store", 'electronics_store',
'gym', 'hair_care', 'hardware_store', 'home_goods_store', 'jewelry_store', 'library', 'meal_takeaway',
'movie_theater', 'museum', 'night_club', 'park', 'pet_store', 'pharmacy', 'restaurant', 'shoe_store',
'shopping_mall', 'spa', 'store', 'supermarket', 'zoo']
```

## Feelings to Place Types
```JSON
{
    "Happy": [
        "bar",
        "restaurant"
    ]
}
```

## Return Example
It probably will include the commute time & type in between as well
```javascript
I20190717-22:49:15.437(-7)? [ { commuteType: 'bus', commuteTime: 0.8199666178579612 },
I20190717-22:49:15.438(-7)?   { _id: 'WfdH7AGHs7fGuYLtF',
I20190717-22:49:15.438(-7)?     geometry: { location: [Object], viewport: [Object] },
I20190717-22:49:15.438(-7)?     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png',
I20190717-22:49:15.438(-7)?     id: 'a5b4102716658839d6463b5f9eb62839630e0d4b',
I20190717-22:49:15.438(-7)?     name: 'Sylvia Hotel and Restaurant',
I20190717-22:49:15.438(-7)?     opening_hours: { open_now: true },
I20190717-22:49:15.438(-7)?     photos: [ [Object] ],
I20190717-22:49:15.438(-7)?     place_id: 'ChIJQxM6DCZyhlQRCMLwTITyWEE',
I20190717-22:49:15.438(-7)?     plus_code:
I20190717-22:49:15.438(-7)?      { compound_code: '7VQ4+CW Vancouver, British Columbia, Canada',
I20190717-22:49:15.438(-7)?        global_code: '84XR7VQ4+CW' },
I20190717-22:49:15.439(-7)?     rating: 4.2,
I20190717-22:49:15.439(-7)?     reference: 'ChIJQxM6DCZyhlQRCMLwTITyWEE',
I20190717-22:49:15.439(-7)?     scope: 'GOOGLE',
I20190717-22:49:15.439(-7)?     types:
I20190717-22:49:15.439(-7)?      [ 'lodging',
I20190717-22:49:15.439(-7)?        'restaurant',
I20190717-22:49:15.439(-7)?        'food',
I20190717-22:49:15.439(-7)?        'point_of_interest',
I20190717-22:49:15.439(-7)?        'establishment' ],
I20190717-22:49:15.439(-7)?     user_ratings_total: 922,
I20190717-22:49:15.440(-7)?     vicinity: '1154 Gilford Street, Vancouver' },
I20190717-22:49:15.440(-7)?   { commuteType: 'bus', commuteTime: 0.01545206475468669 },
I20190717-22:49:15.440(-7)?   { _id: '82Zbn5a9wETg7xAn5',
I20190717-22:49:15.440(-7)?     geometry: { location: [Object], viewport: [Object] },
I20190717-22:49:15.440(-7)?     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
I20190717-22:49:15.440(-7)?     id: 'e00f03cd993ec8e9bf8ac90b884ed08bd493406c',
I20190717-22:49:15.440(-7)?     name: 'Fatburger Denman',
I20190717-22:49:15.440(-7)?     opening_hours: { open_now: false },
I20190717-22:49:15.440(-7)?     photos: [ [Object] ],
I20190717-22:49:15.440(-7)?     place_id: 'ChIJLaZooChyhlQR1IAK72UfpKk',
I20190717-22:49:15.441(-7)?     plus_code:
I20190717-22:49:15.441(-7)?      { compound_code: '7VQ5+8R Vancouver, British Columbia, Canada',
I20190717-22:49:15.441(-7)?        global_code: '84XR7VQ5+8R' },
I20190717-22:49:15.441(-7)?     price_level: 2,
I20190717-22:49:15.441(-7)?     rating: 4,
I20190717-22:49:15.441(-7)?     reference: 'ChIJLaZooChyhlQR1IAK72UfpKk',
I20190717-22:49:15.441(-7)?     scope: 'GOOGLE',
I20190717-22:49:15.441(-7)?     types: [ 'restaurant', 'food', 'point_of_interest', 'establishment' ],
I20190717-22:49:15.441(-7)?     user_ratings_total: 301,
I20190717-22:49:15.441(-7)?     vicinity: '1101 Denman Street, Vancouver' }]
I
```

## Unit
meters