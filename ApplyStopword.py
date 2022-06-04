import pandas as pd
import numpy as np
import re

#col = ['Id', 'Affect Dimension', 'Intensity Class', 'Tweet']


def stop(skripsi):

    return re.sub('(?:[\s]|^)(yang|plus|si|dok|h|kwong|m|untuk|pada|ke|para|namun|menurut|antara|dia|dua|ia|adi|fida|rahman|detikinet|'
                  'seperti|jika|sehingga|kembali|dan|ini|karena|kepada|liput|com|mirza|aminullah|ibrahim|'
                  'oleh|saat|harus|sementara|setelah|kami|sekitar|bagi|bmw|i|luxury|david|bilang|tribunnews|'
                  'serta|di|dari|telah|sebagai|masih|hal|ketika|adalah|itu|wib|yuk|ungkap|cinta|laura|kiehl|'
                  'dalam|bisa|bahwa|atau|hanya|kita|dengan|akan|juga|ada|mereka|ruben|onsu|jpnn|tetap|'
                  'sudah|saya|terhadap|secara|agar|lain|anda|begitu|mengapa|riau|shield|hayatina|achmad|zaky|'
                  'kenapa|yaitu|yakni|daripada|itulah|lagi|maka|tentang|demi|dimana|kompas|ucap|tutur|aryo|erna|luhut|nila|sri|mulyani|prabowo|sandi|'
                  'kemana|pula|sambil|sebelum|sesudah|supaya|guna|kah|pun|sampai|akurat|co|iwan|joeniarto|'
                  'sedangkan|selagi|sementara|tetapi|apakah|kecuali|sebab|selain|usah|ujar|solihin|handoko|herry|turut|'
                  'dahulu|dulunya|anu|demikian|tapi|ingin|mari|donnie|prakoso|soegiharto|anna|tunjuk|'
                  'nanti|melainkan|oh|ok|seharusnya|sebetulnya|setiap|setidaknya|sesuatu|ophirtus|sumule|tiap|'
                  'pasti|saja|toh|ya|walau|tolong|tentu|amat|apalagi|bagaimanapun|indayati|ruben|karel|sanad|cekfakta|air|suara|'
                  'aku|ku|kamu|diantara|disana|disini|disitu|selama|luar|sangat|sebuah|jadi|bola|net|kata|adi|haikal|bekti|anggoro|'
                  'jakarta|terus|piter|sandra|jelas|'
                  'terlalu|walhi|ingat|hoky|adelene|foo|fajrin|rasyid|tengah|tempat|tempo|tegas|rezki|rudiantara|'
                  'tanya|no|inv|xix|iii|rna|maa|ramadhan|putra|l|rp|gb|meidianto|mojokerto|tangerang|gagas|triuntravel|mia|'
                  'siapa|bagai|masing|bawah|atas|samping|apa|nih)(?=[\s]|$)', '', skripsi)



def whitespace(skripsi):

    return re.sub('^[ \t]+|[ \t]+S', '', skripsi)


def applyStopword(skripsi):
    skripsi["title"] = skripsi["title"].apply(lambda x: stop(x))

    skripsi["description"] = skripsi["description"].apply(lambda x: stop(x))

    skripsi["title"] = skripsi["title"].apply(lambda x: whitespace(x))

    skripsi["description"] = skripsi["description"].apply(lambda x: whitespace(x))

    return skripsi