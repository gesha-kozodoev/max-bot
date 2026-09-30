function poll() {
  return {
    step: 0,
    rating: 0,
    liked: [],
    improve: '',
    device: 'Телефон',
    name: '',
    comment: '',
    votes: [],
    lastComment: '',
    toasts: [],
    _toastId: 0,

    likedOptions: ['Дизайн', 'Скорость', 'Кот Барсик', 'Мобильная версия', 'Юмор и тексты'],
    improveOptions: ['Всё отлично', 'Дизайн', 'Скорость', 'Контент', 'Мобильная версия'],

    get ratingHint() {
      return { 0: 'Нажмите на звезду', 1: 'Плохо. Расскажите что не так?', 2: 'Так себе. Что чинить?', 3: 'Норм. Есть куда расти.', 4: 'Хорошо!', 5: 'Отлично! Кот мурчит.' }[this.rating];
    },
    get avgRating() {
      if (!this.votes.length) return '—';
      return (this.votes.reduce((s, v) => s + v.rating, 0) / this.votes.length).toFixed(1);
    },

    init() {
      try { this.votes = JSON.parse(localStorage.getItem('page-poll') || '[]'); }
      catch { this.votes = []; }
    },
    save() { localStorage.setItem('page-poll', JSON.stringify(this.votes)); },
    next() { if (this.step < 3) { this.step++; window.scrollTo({ top: 0 }); } },
    back() { if (this.step > 0) this.step--; },
    restart() {
      this.step = 0; this.rating = 0; this.liked = []; this.improve = '';
      this.name = ''; this.comment = ''; this.lastComment = '';
    },

    submit() {
      this.votes.push({
        rating: this.rating,
        liked: [...this.liked],
        improve: this.improve,
        device: this.device,
        comment: (this.comment || '').trim(),
        ts: Date.now(),
      });
      if ((this.comment || '').trim()) this.lastComment = (this.name ? this.name + ': ' : '') + this.comment.trim();
      this.save();
      this.step = 4;
      window.scrollTo({ top: 0 });
      this.toast('Голос учтён, спасибо!');
    },

    ratingCount(r) { return this.votes.filter(v => v.rating === r).length; },
    ratingPct(r) { return this.votes.length ? Math.round(this.ratingCount(r) / this.votes.length * 100) : 0; },
    likedCount(o) { return this.votes.filter(v => (v.liked || []).includes(o)).length; },
    likedPct(o) { return this.votes.length ? Math.round(this.likedCount(o) / this.votes.length * 100) : 0; },
    improveCount(o) { return this.votes.filter(v => v.improve === o).length; },
    improvePct(o) { return this.votes.length ? Math.round(this.improveCount(o) / this.votes.length * 100) : 0; },

    share() {
      const url = location.href;
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => this.toast('Ссылка на опрос скопирована')).catch(() => this.toast('Ссылка: ' + url));
      else this.toast('Ссылка: ' + url);
    },
    toast(text) {
      const id = ++this._toastId;
      this.toasts.push({ id, text });
      setTimeout(() => { this.toasts = this.toasts.filter(t => t.id !== id); }, 2600);
    },
  };
}
