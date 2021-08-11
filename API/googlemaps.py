import googlemaps

gmaps = googlemaps.Client(key='AIzaSyAPgyovHpbxD2Tk0a0wCQ0dZw8EkRzlEZg')

geocode_result = gmaps.geocode('New York City')
print(geocode_result[0]["geometry"]["location"])

reverse_geocode_result = gmaps.reverse_geocode((40.574250, -74.006689))
print(reverse_geocode_result[1]["formatted_address"])