http://www.windows-naviplus.jp/campaign/win8/

原文件（”DSP版Windows8.1Pro発売記念パック.iso“）在日文Win10下也显示异常，为“DSP版Windows8自作応援キャラクター窓辺ゆう_あいイラスト#A682”。
Linux下显示为：“./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8自作応援キャラクター窓辺ゆう\?あいイラスト/”。
目录内都是空的。

鉴于“DSP版Windows8自作応援キャラクター窓辺ゆう・あいイラスト”含义为”DSP版Windows8自作応援 Character Madobe Yu & Ai Illustration”，即同人作品，
没有也罢。

怀疑光盘是他人在中文Win系统下用普通傻瓜化软件生成ISO造成的。

ISO前面的strings只有“*UDF Image Creator”之类通用的，无法判断。

------

7z x DSP版Windows8.1Pro発売記念パック.iso
find . -name Thumbs.db -delete
cfv -rr -C -t sha1

find ./窓辺ファミリーイラストコレクション/窓辺ゆうあい/ -name '*.psd' -exec ls -lh {} \;

find . -name '*.psd' -exec ls -lh  {} \;|perl -lane 'print join("\t",@F[4,$#F])'
62M	./DSP版Windows8Pro発売記念パック_WedgeMouse操作編/完成壁紙.psd
76M	./DSP版Windows8Pro発売記念パック_タブレット操作編/完成壁紙.psd
146M	./DSP版Windows8Pro発売記念パック_パソコン自作操作編/完成壁紙.psd
6.5M	./DSP版Windows8Pro発売記念パック_ピクチャーパスワード/完成イラスト.psd
200M	./DSP版Windows8Pro発売記念パック_発売記念編/完成壁紙.psd
84M	./DSP版（新規インストール版）Windows8Pro冬のトクトクキャンペーン_クリスマス編/完成壁紙.psd
69M	./DSP版（新規インストール版）Windows8Pro冬のトクトクキャンペーン_初売り編/完成壁紙.psd
72M	./DSP版（新規インストール版）Windows8Pro冬のトクトクキャンペーン_初詣編/完成壁紙.psd
60M	./DSP版（新規インストール版）Windows8Pro冬のトクトクキャンペーン_晴れ着編/完成壁紙.psd
14M	./三頭身イラスト4ポーズ/クリスマスバージョン/クリスマス完成イラスト_哀.psd
9.4M	./三頭身イラスト4ポーズ/クリスマスバージョン/クリスマス完成イラスト_喜.psd
14M	./三頭身イラスト4ポーズ/クリスマスバージョン/クリスマス完成イラスト_怒.psd
15M	./三頭身イラスト4ポーズ/クリスマスバージョン/クリスマス完成イラスト_楽.psd
11M	./三頭身イラスト4ポーズ/晴れ着バージョン/晴れ着完成イラスト_哀.psd
11M	./三頭身イラスト4ポーズ/晴れ着バージョン/晴れ着完成イラスト_喜.psd
11M	./三頭身イラスト4ポーズ/晴れ着バージョン/晴れ着完成イラスト_怒.psd
11M	./三頭身イラスト4ポーズ/晴れ着バージョン/晴れ着完成イラスト_楽.psd
12M	./三頭身イラスト4ポーズ/福袋バージョン/福袋_喜.psd
13M	./三頭身イラスト4ポーズ/福袋バージョン/福袋_楽.psd
11M	./三頭身イラスト4ポーズ/通常バージョン/三頭身_哀.psd
11M	./三頭身イラスト4ポーズ/通常バージョン/三頭身_喜.psd
11M	./三頭身イラスト4ポーズ/通常バージョン/三頭身_怒.psd
11M	./三頭身イラスト4ポーズ/通常バージョン/三頭身_楽.psd
129M	./豪華賞品が抽選で当たる！期間限定Windows8Pro春トクキャンペーン_アイドル編/完成イラスト.psd
131M	./豪華賞品が抽選で当たる！期間限定Windows8Pro春トクキャンペーン_レインコート編/完成イラスト.psd

#find ./窓辺ファミリーイラストコレクション/窓辺ゆうあい/ -name '*.psd' -exec mv {} ./exc/ \;
find . -name '*.psd' -delete

ln -s ./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8自作応援キャラクター窓辺ゆう・あいイラスト/Readme.txt .

du -hd1 .
 13M	./デスクトップの背景
211M	./窓辺ファミリーイラストコレクション
225M	.

find . -type f -exec shasum {} \; |sort >sha1.lst
awk '{print $1}' sha1.lst|uniq -d >dumps.lst
cat dumps.lst|while read a;do grep $a sha1.lst;done|awk '{print $2}'|xargs du -h >> Readme.txt



164K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ババーン.wav
164K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ババーン.wav
108K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ピコ.wav
108K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ピコ.wav
120K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ジャン.wav
120K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ジャン.wav
112K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ピロリン.wav
112K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ピロリン.wav
156K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_チーン.wav
156K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_チーン.wav
144K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ジャジャーン.wav
144K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ジャジャーン.wav
100K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ピポ.wav
100K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ピポ.wav
 80K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ピピッィ.wav
 80K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ピピッィ.wav
156K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_シャキーン.wav
156K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_シャキーン.wav
132K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeAi/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ジャラン.wav
132K	./窓辺ファミリーイラストコレクション/窓辺ゆうあい/DSP版Windows8Pro発売記念パック_テーマ素材/MadobeYu/システムボイス/窓辺ゆう_窓辺あい同時ボイス/you_ai_ジャラン.wav
