var list = {};

$.ajax({
    
    url:"ここに「Kimono」データのURLを入力！",
    
    crossDomain: true,
    dataType: "jsonp",
    
    success: function( response ) {
    
      // 「Kimono」データをすべて「list」へ格納する
      list = response;
      
      // 「Kimono」データから埋め込み動画を生成して表示する
      $(".video").append( getEmbed( getId( response ) ) );
    
    },
    
    error: function( xhr, status ) {
      alert( "エラー！｜" + status );
    }
});


// ボタンがクリックされた時の処理
$('.btn').click( function() {
    
    // 「list」から埋め込み動画を生成する
    var youtubeUrl = getEmbed( getId( list ) );

    // 既存の埋め込み動画を新しい動画に置き換える
    $('iframe').replaceWith( youtubeUrl );
});


// 動画IDを抽出する処理
function getId( response ) {
  
  // 取得した「Kimono」データの要素数の範囲で乱数を生成
  var count = Math.floor( Math.random() * response.count );
  
  // ランダムに動画URLを選択する
  var videoUrl = response.results.collection1[count].link.href;
  
  // 動画IDの場所を検索
  var start = videoUrl.indexOf("watch?v=");
  
  // 動画IDだけを抽出する
  var videoId = videoUrl.substring(start + 8);

	return videoId;
}


// 埋め込み動画URLを生成する処理
function getEmbed( id ) {
    var url = '<iframe width="480" height="320" src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&showinfo=0" class="movieif_smartphone_resize" frameborder="0" allowfullscreen></iframe>';
    
    return url;
}