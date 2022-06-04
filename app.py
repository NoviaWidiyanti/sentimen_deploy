import requests
import datetime
from flask import Flask, render_template, request
import json
import jsonify
import pandas as pd
from ApplyPreprocessing import removePunctuation, putStemming
from ApplyStopword import applyStopword
from Skripsi_Test import konten
import itertools 
from nltk.tokenize import word_tokenize  # to split sentences into words
from nltk.corpus import stopwords  # to get a list of stopwords
from collections import Counter  # to get words-frequency
import csv
from pandas import Timestamp
from numpy import nan
import numpy as np
import math
app = Flask(__name__)
app.config['DEBUG'] = True



@app.route('/', methods=['GET', 'POST'])
def index():
	search_url = 'https://newsapi.org/v2/everything?'
	berita = []

	if request.method == 'POST':
		value = request.form.get('search')
		time_window = int(request.form.get('time-window')) or 1

		from_date = datetime.datetime.now() - datetime.timedelta(days=time_window)
		to_date = datetime.datetime.now().strftime("%Y-%m-%d")

		query = request.form.get('anywhere')
		if query == 'titlebody':
			q = {'q':request.form.get('search')}
		elif query == 'title':
			q = {'qInTitle':request.form.get('search')}

		sort = request.form.get('sort') 

		search_params = {
			'from':from_date.strftime("%Y-%m-%d"),
			'to': to_date,
			'language':'id',
			'sortBy': sort,
			'apiKey': '98c53e728c2342d78f6d9516e8c18fcd'
		}
		search_params.update(q)
		# print(search_params)

		r = requests.get(search_url, params=search_params)
		data = r.json()['articles']
		
		for x in data:
			tanggal = x['publishedAt'][:10]
			tahun = int(tanggal[:4])
			bulan = int(tanggal[5:7])
			hari = int(tanggal[-2:])
			

			formatted_date = datetime.date(tahun, bulan, hari).strftime("%d %B %Y")

			berita_data = {
				'title' : x['title'],
				'description' : x['description'],
				'url' : x['url'],
				'urlToImage' : x['urlToImage'],
				'publishedAt' : formatted_date,
				'author' : x['author'],
				'sumber' : x['source']['name']
			}
			berita.append(berita_data)
		berita1 = pd.DataFrame.from_dict(berita)
		
		skripsi = putStemming(berita1)
		# skripsi.to_csv('tes1.csv')

		skripsi2 = applyStopword(skripsi)
		skripsi2.to_csv('hasil.csv')

		# skripsi3 = konten(skripsi2, 'SVM_Model_2.sav')
		skrip, si3 = konten(skripsi2, 'proba.sav')
		 

		berita1['hasil_sentimen'] = pd.Series(skrip)
		berita1['probability'] = pd.Series(si3)
		berita1['probability'] = berita1['probability'].round(2) * 100
		berita1['probability'] = berita1['probability'] // np.power(10, np.log10(berita1['probability']).astype(int) - 1)
		# print(berita1)
		berita1.to_csv('tes3.csv') 

		sentiment = request.form.get('sentiment')
		if sentiment == 'All':
			berita2 = berita1
		elif sentiment != 'All':
			query_hasil = "hasil_sentimen==\"%s\"" % sentiment
			berita2 = berita1.query(query_hasil)
		berita2.to_csv('tes4.csv')
		return render_template('result.html', berita=berita2, value=value)
		return render_template('hello.html')

	return render_template('index.html')

@app.route('/result', methods=['GET', 'POST'])
def show_result():
	berita2 = pd.read_csv('tes4.csv')
	return render_template('result.html', berita=berita2)

@app.route('/insight', methods=['GET', 'POST'])
def show_insight():	
	return render_template('insight.html')

@app.route('/insight_data', methods=['GET', 'POST'])
def insight_word_cloud():
	try:
		f = open('hasil.csv','r')
		sentences = ""
		reader = csv.reader(f)
		next(reader, None)
		for row in reader:
			sentences = row[1] + " " + row[2]
		words = word_tokenize(sentences)
		words_freq = Counter(words)
		words_json = [{'text': word, 'weight': count} for word, count in words_freq.items()]
		f.close()	    
		return json.dumps(words_json)
	except Exception as e:
		return '[]'

@app.route('/linechart', methods=['GET', 'POST'])
def insight_line_chart():
	try:
		f = open('tes3.csv','r')
		sentences = ""
		publishedAt = ""
		hasil_sentimen = ""
		reader = csv.reader(f)
		next(reader, None)

		sentencess = []
		publishedAts = []
		hasil_sentimens = []
		for row in reader:
			sentences = row[1] + " " + row[2]
			publishedAt = row[5] + " "
			hasil_sentimen = row[8] + " "
			sentencess.append(sentences)
			publishedAts.append(publishedAt)
			hasil_sentimens.append(hasil_sentimen)


		df = pd.DataFrame.from_dict({ 'sentencess' : sentencess, 'publishedAts' : publishedAts, 'hasil_sentimens' : hasil_sentimens })
		# df.to_csv('chart.csv')

		df['publishedAts'] = pd.to_datetime(df['publishedAts'], errors='coerce')
		by_day_sentiment = df.groupby([pd.Grouper(key='publishedAts',freq='D'),'hasil_sentimens']).size().unstack('hasil_sentimens')		
		sentiment_dict = by_day_sentiment.to_dict('dict')
		sentiment_dict_new = {k: {m.strftime('%Y-%m-%d %H:%M:%S'): v if v == v else 0 for m, v in v.items()} for k, v in sentiment_dict.items()}
		# print(sentiment_dict_new)
		filter = {k:list(v.values()) for k, v in sentiment_dict_new.items()}
		list_tanggal = []
		any_key = next(iter(filter))
		for key in sentiment_dict_new[any_key]:
			list_tanggal.append(key)
		# print(list_tanggal)
		filter["tanggal"] = list_tanggal		
		f.close()
		return json.dumps(filter)
	except Exception as e:
		raise
		
@app.route('/piechart', methods=['GET', 'POST'])
def insight_pie_chart():
	try:
		f = open('tes3.csv','r')
		sentences = ""
		publishedAt = ""
		hasil_sentimen = ""
		reader = csv.reader(f)
		next(reader, None)

		sentencess = []
		publishedAts = []
		hasil_sentimens = []
		for row in reader:
			
			sentences = row[1] + " " + row[2]
			publishedAt = row[5] + " "
			hasil_sentimen = row[8] + " "

			sentencess.append(sentences)
			publishedAts.append(publishedAt)
			hasil_sentimens.append(hasil_sentimen)


		df = pd.DataFrame.from_dict({ 'sentencess' : sentencess, 'publishedAts' : publishedAts, 'hasil_sentimens' : hasil_sentimens })		
		df['publishedAts'] = pd.to_datetime(df['publishedAts'], errors='coerce')
		by_day_sentiment = df.groupby([pd.Grouper(key='publishedAts',freq='D'),'hasil_sentimens']).size().unstack('hasil_sentimens')
				
		sentiment_dict = by_day_sentiment.to_dict('dict')
		sentiment_dict_new = {k: {m.strftime('%Y-%m-%d %H:%M:%S'): v if v == v else 0 for m, v in v.items()} for k, v in sentiment_dict.items()}
		# print(sentiment_dict_new)
		filter = {k:list(v.values()) for k, v in sentiment_dict_new.items()}
		filter1 = {k:sum(list(v.values())) for k, v in sentiment_dict_new.items() if k!= 'tanggal'}
		f.close()
		return json.dumps(filter1)
	except Exception as e:
		# print("exception saya")
		# print(e)
		raise

if __name__ == '__main__':
	app.run(debug=True)