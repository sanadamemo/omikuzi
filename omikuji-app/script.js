// おみくじの運勢データ
const fortuneData = {
    daikichi: {
        level: '大吉',
        emoji: '🎊',
        description: '最高の運勢です！今日は何をしても成功するでしょう。',
        overall: '大吉',
        love: '大吉',
        work: '大吉',
        money: '大吉',
        health: '大吉',
        messages: [
            '今日は特別な日になるでしょう。新しい出会いが待っています。',
            'あなたの努力が実を結ぶ日です。自信を持って進んでください。',
            '家族や友人との絆が深まる一日です。感謝の気持ちを伝えましょう。',
            '創造性が高まる日です。新しいアイデアが次々と浮かんでくるでしょう。',
            '健康運も良好です。運動や散歩で体を動かすとさらに運気が上がります。'
        ]
    },
    chukichi: {
        level: '中吉',
        emoji: '🎉',
        description: '良い運勢です。積極的に行動すれば良い結果が得られるでしょう。',
        overall: '中吉',
        love: '中吉',
        work: '中吉',
        money: '中吉',
        health: '中吉',
        messages: [
            '安定した運気の日です。着実に目標に向かって進んでください。',
            '人とのコミュニケーションが良好です。新しい関係を築くチャンスです。',
            '仕事や勉強で成果を上げられる日です。集中力を活かしましょう。',
            '金運も良好です。投資や貯蓄を考えるのに適した日です。',
            '体調管理を心がけることで、さらに運気が向上します。'
        ]
    },
    shokichi: {
        level: '小吉',
        emoji: '✨',
        description: 'まずまずの運勢です。小さな幸せを大切にしましょう。',
        overall: '小吉',
        love: '小吉',
        work: '小吉',
        money: '小吉',
        health: '小吉',
        messages: [
            '穏やかな一日を過ごせるでしょう。小さな喜びを見つけてください。',
            '身近な人との関係を大切にしましょう。思いやりの心が運気を上げます。',
            '地道な努力が実を結ぶ日です。焦らずに進んでください。',
            '無駄遣いに注意しましょう。計画的にお金を使うことが大切です。',
            '適度な運動で体調を整えると、運気がさらに良くなります。'
        ]
    },
    kichi: {
        level: '吉',
        emoji: '🍀',
        description: '安定した運勢です。慎重に行動すれば問題ありません。',
        overall: '吉',
        love: '吉',
        work: '吉',
        money: '吉',
        health: '吉',
        messages: [
            '平穏な一日を過ごせるでしょう。感謝の気持ちを忘れずに。',
            '周囲の人との調和を大切にしてください。協力することで良い結果が得られます。',
            '仕事では細かい作業に集中すると良いでしょう。',
            '金運は安定しています。無理な投資は避けてください。',
            '規則正しい生活を心がけることで、運気が安定します。'
        ]
    },
    kyo: {
        level: '凶',
        emoji: '⚠️',
        description: '注意が必要な日です。慎重に行動しましょう。',
        overall: '凶',
        love: '凶',
        work: '凶',
        money: '凶',
        health: '凶',
        messages: [
            '今日は慎重に行動することをお勧めします。急いで決断しないでください。',
            '人との関係で誤解が生じやすい日です。コミュニケーションを大切に。',
            '仕事では細かいミスに注意しましょう。確認を怠らないことが大切です。',
            '金運は要注意です。大きな買い物は避けることをお勧めします。',
            '体調管理に気をつけてください。無理をしないことが大切です。'
        ]
    },
    daikyo: {
        level: '大凶',
        emoji: '💀',
        description: '今日は特に注意が必要です。静かに過ごすことをお勧めします。',
        overall: '大凶',
        love: '大凶',
        work: '大凶',
        money: '大凶',
        health: '大凶',
        messages: [
            '今日は静かに過ごすことをお勧めします。大きな決断は避けてください。',
            '人との関係でトラブルが起きやすい日です。言葉に気をつけましょう。',
            '仕事では細心の注意を払ってください。ミスを防ぐことが大切です。',
            '金運は最悪です。お金に関することは全て避けることをお勧めします。',
            '体調に特に注意が必要です。無理をせず、休息を取ってください。'
        ]
    }
};

// 運勢の重み付け（確率調整）
const fortuneWeights = {
    daikichi: 5,    // 5%
    chukichi: 15,   // 15%
    shokichi: 25,   // 25%
    kichi: 30,      // 30%
    kyo: 20,        // 20%
    daikyo: 5       // 5%
};

// DOM要素の取得
const drawButton = document.getElementById('drawButton');
const resetButton = document.getElementById('resetButton');
const fortuneResult = document.getElementById('fortuneResult');
const fortuneDetails = document.getElementById('fortuneDetails');
const omikujiPaper = document.getElementById('omikujiPaper');

// 運勢をランダムに選択する関数
function selectFortune() {
    const totalWeight = Object.values(fortuneWeights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const [fortune, weight] of Object.entries(fortuneWeights)) {
        random -= weight;
        if (random <= 0) {
            return fortune;
        }
    }
    
    return 'kichi'; // デフォルト
}

// 運勢の詳細をランダムに選択する関数
function getRandomFortuneDetails(fortuneKey) {
    const fortune = fortuneData[fortuneKey];
    const randomMessage = fortune.messages[Math.floor(Math.random() * fortune.messages.length)];
    
    // 各運勢をランダムに少し変動させる
    const variations = ['大吉', '中吉', '小吉', '吉', '凶', '大凶'];
    const overallVariation = Math.random() < 0.3 ? variations[Math.floor(Math.random() * variations.length)] : fortune.overall;
    const loveVariation = Math.random() < 0.3 ? variations[Math.floor(Math.random() * variations.length)] : fortune.love;
    const workVariation = Math.random() < 0.3 ? variations[Math.floor(Math.random() * variations.length)] : fortune.work;
    const moneyVariation = Math.random() < 0.3 ? variations[Math.floor(Math.random() * variations.length)] : fortune.money;
    const healthVariation = Math.random() < 0.3 ? variations[Math.floor(Math.random() * variations.length)] : fortune.health;
    
    return {
        ...fortune,
        overall: overallVariation,
        love: loveVariation,
        work: workVariation,
        money: moneyVariation,
        health: healthVariation,
        message: randomMessage
    };
}

// アニメーション効果
function addShakeEffect() {
    omikujiPaper.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        omikujiPaper.style.animation = '';
    }, 500);
}

// CSSアニメーションを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    .fortune-result {
        animation: fadeIn 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// おみくじを引く関数
function drawOmikuji() {
    // ボタンを無効化
    drawButton.disabled = true;
    drawButton.style.opacity = '0.6';
    
    // シェイク効果
    addShakeEffect();
    
    // 結果をクリア
    fortuneResult.innerHTML = '<div class="result-placeholder"><span class="placeholder-text">おみくじを引いています...</span></div>';
    fortuneDetails.style.display = 'none';
    
    // 少し待ってから結果を表示
    setTimeout(() => {
        const selectedFortune = selectFortune();
        const fortuneDetails = getRandomFortuneDetails(selectedFortune);
        
        // 結果を表示
        displayFortune(fortuneDetails);
        
        // ボタンを更新
        drawButton.style.display = 'none';
        resetButton.style.display = 'flex';
        resetButton.disabled = false;
    }, 1000);
}

// 運勢を表示する関数
function displayFortune(fortune) {
    const resultHTML = `
        <div class="fortune-result">
            <span class="fortune-level ${getFortuneClass(fortune.level)}">${fortune.emoji}</span>
            <div class="fortune-text ${getFortuneClass(fortune.level)}">${fortune.level}</div>
            <div class="fortune-description">${fortune.description}</div>
        </div>
    `;
    
    fortuneResult.innerHTML = resultHTML;
    
    // 詳細情報を更新
    document.getElementById('overallFortune').textContent = fortune.overall;
    document.getElementById('loveFortune').textContent = fortune.love;
    document.getElementById('workFortune').textContent = fortune.work;
    document.getElementById('moneyFortune').textContent = fortune.money;
    document.getElementById('healthFortune').textContent = fortune.health;
    document.getElementById('fortuneMessage').textContent = fortune.message;
    
    // 詳細セクションを表示
    setTimeout(() => {
        document.getElementById('fortuneDetails').style.display = 'block';
    }, 500);
}

// 運勢レベルに応じたCSSクラスを取得
function getFortuneClass(level) {
    switch(level) {
        case '大吉': return 'fortune-daikichi';
        case '中吉': return 'fortune-chukichi';
        case '小吉': return 'fortune-shokichi';
        case '吉': return 'fortune-kichi';
        case '凶': return 'fortune-kyo';
        case '大凶': return 'fortune-daikyo';
        default: return '';
    }
}

// リセット関数
function resetOmikuji() {
    fortuneResult.innerHTML = '<div class="result-placeholder"><span class="placeholder-text">おみくじを引いてください</span></div>';
    fortuneDetails.style.display = 'none';
    
    drawButton.style.display = 'flex';
    drawButton.disabled = false;
    drawButton.style.opacity = '1';
    resetButton.style.display = 'none';
}

// イベントリスナーの設定
drawButton.addEventListener('click', drawOmikuji);
resetButton.addEventListener('click', resetOmikuji);

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('おみくじアプリが読み込まれました！');
    
    // キーボードショートカットの追加
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !drawButton.disabled) {
            e.preventDefault();
            drawOmikuji();
        } else if (e.code === 'Escape') {
            resetOmikuji();
        }
    });
});

// タッチデバイス用のタッチイベント
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY - touchEndY;
    
    // 上向きスワイプでおみくじを引く
    if (swipeDistance > 50 && !drawButton.disabled) {
        drawOmikuji();
    }
}); 