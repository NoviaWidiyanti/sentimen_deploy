import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.model_selection import KFold
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import pickle

class SkripsiPipeline():
	def __init__ (self, predictor):
		self.predictor = predictor
	def fit(self,X,y):
		vectorizer = CountVectorizer()
		tfidf_transformer = TfidfTransformer()
		svm_predictor = self.predictor
		X = vectorizer.fit_transform(X)
		X = tfidf_transformer.fit_transform(X)
		svm_predictor.fit(X,y)

		self.vectorizer = vectorizer
		self.tfidf_transformer = tfidf_transformer
		self.svm_predictor = svm_predictor

	def predict (self, X):
		X = self.vectorizer.transform(X)
		X = self.tfidf_transformer.transform(X)
		prediction = self.svm_predictor.predict(X)
		return prediction

	def predict_proba (self, X):
		X = self.vectorizer.transform(X)
		X = self.tfidf_transformer.transform(X)
		proba = self.svm_predictor.predict_proba(X)
		return proba