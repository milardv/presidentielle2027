"""Render the article's chart from explicitly dated, published forecasts.

Requires matplotlib and Pillow. Run from any directory.
"""
from pathlib import Path
import matplotlib

matplotlib.use('Agg')
import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO

fig, ax = plt.subplots(figsize=(12, 8), dpi=100)
fig.patch.set_facecolor('#f6f3ed')
ax.set_facecolor('#f6f3ed')
fig.text(.09, .91, '2027 : deux scénarios de croissance', fontsize=24,
         fontweight='bold', color='#172b3a')
fig.text(.09, .85, 'Variation annuelle du PIB réel · prévisions, en %',
         fontsize=15, color='#52616b')
ax.barh([1, 0], [1, .5], height=.38, color=['#223e50', '#aa443b'])
ax.set_yticks([1, 0], ['Gouvernement', 'OFCE'], fontsize=15, color='#172b3a')
ax.set_xlim(0, 1.2)
ax.set_ylim(-.65, 1.65)
ax.set_xticks([0, .25, .5, .75, 1], ['0', '0,25', '0,50', '0,75', '1,00'], fontsize=12)
ax.xaxis.grid(True, color='#ddd7cc')
ax.set_axisbelow(True)
for y, value, label in [(1, 1, '1,0 %'), (0, .5, '0,5 %')]:
    ax.text(value + .025, y, label, va='center', fontsize=21,
            fontweight='bold', color='#172b3a')
for spine in ax.spines.values():
    spine.set_visible(False)
ax.tick_params(axis='both', length=0, pad=12)
fig.subplots_adjust(left=.23, right=.93, top=.76, bottom=.23)
fig.text(.09, .12, 'Sources : Bercy, 11 septembre 2026 ; OFCE, octobre 2026 (CC BY 4.0).',
         fontsize=11, color='#52616b')
fig.text(.09, .075, 'Scénarios conditionnels : ces valeurs ne sont pas des résultats constatés.',
         fontsize=12, color='#172b3a')
buffer = BytesIO()
fig.savefig(buffer, format='png', facecolor=fig.get_facecolor())
buffer.seek(0)
target = Path(__file__).resolve().parents[1] / 'public/actu/budget-2027-croissance.webp'
Image.open(buffer).save(target, quality=92)
plt.close(fig)
