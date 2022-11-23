from django.shortcuts import render
from django.conf import settings
import pandas as pd
import json

def index(request):
    df = pd.read_excel(settings.MEDIA_ROOT+'/excel/서울특별시 영등포구_의류수거함 위치현황_20220731.xlsx')
    # df['데이터기준일자'] = df['데이터기준일자'].dt.strftime('%Y.%m.%d')
    df.fillna('', inplace=True)

    dong_list = {
        '영등포본동': 'ydp_bongdong',
        '영등포동': 'ydp_dong',
        '당산제1동': 'ydp_dangsan1',
        '당산제2동': 'ydp_dangsan2',
        '도림동': 'ydp_dorim',
        '문래동': 'ydp_munrae',
        '양평제1동': 'ydp_yangpyeong1',
        '양평제2동': 'ydp_yangpyeong2',
        '신길제1동': 'ydp_singil1',
        '신길제3동': 'ydp_singil3',
        '신길제4동': 'ydp_singil4',
        '신길제5동': 'ydp_singil5',
        '신길제6동': 'ydp_singil6',
        '신길제7동': 'ydp_singil7',
        '대림제1동': 'ydp_daerim1',
        '대림제2동': 'ydp_daerim2',
        '대림제3동': 'ydp_daerim3',
    }

    data = dict()
    for dong in df['행정동'].unique():
        content_list = []
        for value in df[df['행정동']==dong].values:
            content = {
                "street": value[1],
                "lot": value[2],
                "latitude": value[3],
                "longitude": value[4]
            }
            content_list.append(content)
        data[dong_list[dong]] = content_list

    context = {
        'bin_info': json.dumps(data, ensure_ascii=False)
    }

    return render(request, 'map/index.html', context)