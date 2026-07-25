from collections import Counter
import re
from pathlib import Path

text = Path(r"d:\DB BackupNew\YatraNexus\src\lib\package-images.ts").read_text(encoding="utf-8")
m = re.search(r"const DESTINATION_IMAGE_POOLS[^=]*=\{([\s\S]*?)\n\};", text)
body = m.group(1)
keys = re.findall(r'^\s*(?:"([^"]+)"|([A-Za-z][A-Za-z ]*)):', body, re.M)
keys = [a or b for a, b in keys]
print(Counter(keys))
dups = [k for k, v in Counter(keys).items() if v > 1]
print("DUPS", dups)
