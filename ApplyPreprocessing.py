import pandas as pd
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
import re
import string
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
import numpy as np

#Datasests loading

#Menghilangkan tanda baca pada judul dan deskripsi
def removePunctuation(x):
	# Mengubah text menjadi lowercase
    x = x.lower()
    # Removing non ASCII chars
    x = re.sub(r'[^\x00-\x7f]',r' ',x)
    #Numbers removing
    x = re.sub(r'\d+', '',x)
    # Removing (replacing with empty spaces actually) all the punctuations
     
    return np.array(re.sub("["+string.punctuation+"]", " ", x))

def putStemming(berita):

	skripsi = pd.DataFrame(columns=['title','description'])

	for k in berita.itertuples(index=False):
		skripsi['title'] = berita['title']
		skripsi['title'] = skripsi['title'].map(removePunctuation)
		skripsi['description'] = berita['description']
		skripsi['description'] = skripsi['description'].map(removePunctuation)

	#Stemming
	
	factory = StemmerFactory()
	stemmer = factory.create_stemmer()
	skripsi = skripsi.astype(str)
	a = []
	for v in skripsi['title'] :
		a.append(stemmer.stem(v))
	skripsi['title'] = pd.Series(a)

	b = []
	for w in skripsi['description'] :
		b.append(stemmer.stem(w))
	skripsi['description'] = pd.Series(b)

	return skripsi


 