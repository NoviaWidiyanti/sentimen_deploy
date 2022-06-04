import pandas as pd 
from sklearn.svm import SVC
from sklearn.svm import LinearSVC
import pickle
from nltk.tokenize import sent_tokenize
import nltk
from Model import SkripsiPipeline

def konten(kata, model):
	nltk.download('punkt')
	sentiment = []
	probability = []
	loaded_model = pickle.load(open(model, 'rb'))
	for v in kata.itertuples(index = False):
		 
		variabel1 = v[0]
		variabel2 = v[1]

		kalimat = variabel1 + variabel2

		hasil_tokenize = sent_tokenize(kalimat)

		preds = loaded_model.predict(hasil_tokenize)
		
		
		if preds == -1:
			proba = loaded_model.predict_proba(hasil_tokenize)
			proba = proba.reshape(-1, 1).tolist()
			sentiment.append('Negatif')
			probability.extend(proba[0])

		elif preds == 0:
			proba = loaded_model.predict_proba(hasil_tokenize)
			proba = proba.reshape(-1, 1).tolist()
			sentiment.append('Netral')
			probability.extend(proba[1])
		elif preds == 1:
			proba = loaded_model.predict_proba(hasil_tokenize)
			proba = proba.reshape(-1,1).tolist()
			sentiment.append('Positif')
			probability.extend(proba[2])

	return sentiment, probability

	


	