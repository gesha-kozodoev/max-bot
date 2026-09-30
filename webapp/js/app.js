function tube() {
  return {
    tab: 'home',
    sidebar: true,
    msearch: false,
    query: '',
    sort: 'new',
    subscribed: false,
    bell: true,
    likes: 48213,
    liked: 0,
    modal: null,
    avatar: 'https://cataas.com/cat?width=300&height=300',
    featured: {
      title: 'Барсик тестирует nginx: статика за 12 мс',
      thumb: 'https://cataas.com/cat?width=960&v=31',
      dur: '12:47', views: '1,4 млн просмотров', age: '2 дня назад',
      desc: 'Полный разбор полигона: локальный nginx на :8080, отдача статики без сборки, подготовка к GitHub Pages и WebApp для бота в MAX.',
    },
    videos: [
      { id: 1, title: 'Сон на батарее: 10 часов без перерыва', thumb: 'https://cataas.com/cat?width=640&v=1', dur: '10:00:01', views: '2,1 млн просмотров', age: 'неделю назад', pop: 98 },
      { id: 2, title: 'Тыгыдык в 3 часа ночи — разбор полётов', thumb: 'https://cataas.com/cat?width=640&v=2', dur: '8:24', views: '980 тыс. просмотров', age: '3 дня назад', pop: 91 },
      { id: 3, title: 'Мурчание 25 Гц: замеряем осциллографом', thumb: 'https://cataas.com/cat?width=640&v=3', dur: '15:10', views: '760 тыс. просмотров', age: '2 недели назад', pop: 84 },
      { id: 4, title: 'Рыба vs курочка: слепой тест', thumb: 'https://cataas.com/cat?width=640&v=4', dur: '11:02', views: '1,1 млн просмотров', age: '5 дней назад', pop: 95 },
      { id: 5, title: 'Лежу на клавиатуре и деплою в прод', thumb: 'https://cataas.com/cat?width=640&v=5', dur: '6:33', views: '430 тыс. просмотров', age: 'день назад', pop: 88 },
      { id: 6, title: 'nginx за 5 минут: объясняет кот', thumb: 'https://cataas.com/cat?width=640&v=6', dur: '5:01', views: '310 тыс. просмотров', age: '4 дня назад', pop: 80 },
      { id: 7, title: 'Коробка или диван: честный обзор', thumb: 'https://cataas.com/cat?width=640&v=7', dur: '9:47', views: '520 тыс. просмотров', age: 'неделю назад', pop: 77 },
      { id: 8, title: 'GitHub Pages: выкладываем визитку', thumb: 'https://cataas.com/cat?width=640&v=8', dur: '13:20', views: '190 тыс. просмотров', age: '6 дней назад', pop: 72 },
    ],
    comments: [
      { id: 1, name: 'Админ полигона', age: 'день назад', text: 'Кот отлично держит нагрузку: 18 млн просмотров и ни одного падения.', likes: 214 },
      { id: 2, name: 'Зритель', age: '3 часа назад', text: 'Тыгыдык в 3 часа ночи — жизненно. Подписался.', likes: 45 },
    ],
    newComment: '',
    toasts: [],
    _toastId: 0,

    init() {
      const s = localStorage.getItem('meowtube');
      if (s) {
        try {
          const d = JSON.parse(s);
          this.subscribed = !!d.subscribed;
          this.likes = d.likes || this.likes;
        } catch {}
      }
    },
    save() { localStorage.setItem('meowtube', JSON.stringify({ subscribed: this.subscribed, likes: this.likes })); },
    get subsText() { return this.subscribed ? '1,3 млн подписчиков' : '1,2 млн подписчиков'; },
    filtered() {
      let list = this.videos.filter(v => {
        if (!this.query) return true;
        return (v.title || '').toLowerCase().includes(this.query.toLowerCase());
      });
      if (this.sort === 'top') list = [...list].sort((a, b) => b.pop - a.pop);
      return list;
    },
    subscribe() {
      this.subscribed = !this.subscribed;
      this.save();
      this.toast(this.subscribed ? 'Вы подписались на канал «Барсик»' : 'Подписка отменена');
    },
    like(d) {
      if (this.liked === d) { this.likes -= d; this.liked = 0; }
      else { this.likes += d - this.liked; this.liked = d; }
      this.save();
    },
    playFeatured() { this.toast('Воспроизведение: ' + this.featured.title); },
    openVideo(v) { this.modal = v; },
    share() {
      const url = location.href;
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => this.toast('Ссылка скопирована в буфер обмена')).catch(() => this.toast('Ссылка: ' + url));
      else this.toast('Ссылка: ' + url);
    },
    addComment() {
      const t = (this.newComment || '').trim();
      if (!t) return;
      this.comments.unshift({ id: Date.now(), name: 'Вы', age: 'только что', text: t, likes: 0 });
      this.newComment = '';
      this.toast('Комментарий опубликован');
    },
    toast(text) {
      const id = ++this._toastId;
      this.toasts.push({ id, text });
      setTimeout(() => { this.toasts = this.toasts.filter(t => t.id !== id); }, 2600);
    },
    avatarFallback(e) { e.target.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#7c6cff"/><text x="50%" y="58%" font-size="120" text-anchor="middle" fill="#fff">B</text></svg>'); },
    imgFallback(e) { e.target.src = 'https://placecats.com/640/360'; },
  };
}
