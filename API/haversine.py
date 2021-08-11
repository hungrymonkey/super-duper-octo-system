from math import radians, sin, cos, sqrt, asin

def hd(loc1, loc2):
    distance_lon = loc2[1] - loc1[1]
    distance_lat = loc2[0] - loc1[0]
    a1 = sin(radians(distance_lat/2))**2 + cos(radians(loc1[0])) * cos(radians(loc2[0])) * sin(radians(distance_lon/2)) ** 2
    c1 = 2 * asin(sqrt(a1))
    r = 3961
    return c1 * r 

def dd(loc1,loc2):
    lat1,lon1 = loc1
    lat2,lon2 = loc2
    x = lat1 - lat2
    y = (lon1 - lon2)*cos(radians(lat2))
    return 69.385*sqrt(x**2 + y**2)

def eu_distance(loc1,loc2):
    return sqrt(sum([(i-j)**2 for i,j in zip(loc1,loc2)]))

l1 = (40.574250, -74.006689)

l2 = (44.646855, -63.571072)

print(hd(l1,l2))
print(eu_distance(l1,l2))
print(dd(l1,l2))