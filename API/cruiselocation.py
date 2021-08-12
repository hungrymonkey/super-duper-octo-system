import gmplot
import math
from haversine import hd

latitude = [40.574250, 44.646855, 50.885678, 38.709906, 34.18671199927991, 25.684660]

longitude = [-74.006689, -63.571072, -1.396664, -9.126695, -77.80923168683415, -80.166976]

gmap = gmplot.GoogleMapPlotter(40.574250, -74.006689,15)

#New York City
l1 = (40.574250, -74.006689)

#Halifax, NS
l2 = (44.646855, -63.571072)

#Southampton, UK
l3 = (50.885678, -1.396664)

#Lisbon,  Portugal
l4 = (38.709906, -9.126695)

#Wilmington, NC
l5 = (34.18671199927991, -77.80923168683415)

#Miami, FL
l6 = (25.684660, -80.166976)

#lats = [l1[0],l2[0],l3[0],l4[0],l5[0],l6[0]]
#lons = [l1[1],l2[1],l3[1],l4[1],l5[1],l6[1]]



gmap.scatter(latitude,longitude,'red',size=30,marker=False)

min = 99999999
mini=0
minj=0
for i in range(0, len(latitude)-1):
    for j in range(i + 1, len(latitude)):
        if(hd((latitude[i],longitude[i]),(latitude[j],longitude[j]))<min):
            min = hd((latitude[i],longitude[i]),(latitude[j],longitude[j]))
            mini=i
            minj=j

gmap.plot([latitude[mini],latitude[minj]],[longitude[mini],longitude[minj]],'cornflowerblue',size=30,marker=False)

gmap.draw("cruisemap.html")