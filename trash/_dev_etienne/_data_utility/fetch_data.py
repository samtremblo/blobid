import requests


Confirmed_Global = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
Death_Global = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
Recovered_Global = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"		
all = Recovered_Global,Confirmed_Global,Death_Global
name = "Recovered_Global","Confirmed_Global","Death_Global"
	
for i in range(len(all)):
		
	r = requests.get(all[i], allow_redirects=True)
	open(name[i]+".csv", 'wb').write(r.content)