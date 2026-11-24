#!/usr/bin/env python3
"""Pretendard / Play 폰트 서브셋 생성기.

원본 폰트(전체 한글 11,172자, 웨이트당 약 780KB)에서
 - 사이트에서 실제 사용하는 모든 글자
 - KS X 1001 한글 2,350자(일상 문서 수준, 문구 수정 대비)
 - ASCII / 기본 기호
만 남겨 woff2로 저장한다.

사용법: python3 tools/subset-fonts.py <원본 fonts 폴더> <site 폴더>
"""
import os, sys, glob, re
from fontTools import subset
from fontTools.ttLib import TTFont

src_fonts, site = sys.argv[1], sys.argv[2]
out_dir = os.path.join(site, 'assets', 'fonts')

chars = set(chr(c) for c in range(0x20, 0x7F))
chars |= set('·•—–‘’“”…↗←→↑↓©®™×°±%‰′″①②③④⑤≥≤≈~※◦▪▶◀▲▼✓✔✕')
# KS X 1001 한글 2,350자
for hi in range(0xB0, 0xC9):
    for lo in range(0xA1, 0xFF):
        try:
            chars.add(bytes([hi, lo]).decode('euc-kr'))
        except UnicodeDecodeError:
            pass
# 사이트 내 실제 사용 글자
for root, _, files in os.walk(site):
    for f in files:
        if f.endswith(('.html', '.js', '.css', '.svg')):
            chars |= set(open(os.path.join(root, f), encoding='utf-8', errors='ignore').read())
chars = {c for c in chars if c >= ' ' and ord(c) not in range(0x80, 0xA0)}
print('subset chars:', len(chars))

def run(path_in, path_out):
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    opts.notdef_outline = True
    opts.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]  # 라이선스 문구 유지
    opts.hinting = False
    font = subset.load_font(path_in, opts)
    s = subset.Subsetter(opts)
    s.populate(text=''.join(sorted(chars)))
    s.subset(font)
    subset.save_font(font, path_out, opts)
    print(f'{os.path.basename(path_out):36s} {os.path.getsize(path_out)/1024:7.0f} KB')

for p in sorted(glob.glob(os.path.join(src_fonts, 'Pretendard-*.woff2'))):
    run(p, os.path.join(out_dir, os.path.basename(p)))
for p, name in [('6aez4K2oVqwIjtI.ttf', 'Play-Regular.woff2'), ('6ae84K2oVqwItm4TOpc.ttf', 'Play-Bold.woff2')]:
    run(os.path.join(src_fonts, p), os.path.join(out_dir, name))
