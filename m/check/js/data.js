const interval = 1500;
const Radio = (unit, text) => {
    return { unit, text };
}
const getRadios = (a, b, c, d, e) => {
    return [
        Radio("leo", a),
        Radio("more", b),
        Radio("vivid", c),
        Radio("wonder", d),
        Radio("night", e)
    ];
}
const radio1 = getRadios("切なく優しい想い", "希望にあふれた想い", "熱くパワフルな想い", "楽しく明るい想い", "苦しみに満ちた想い");
const radio2 = getRadios("きらめく青の音色", "かがやく緑の音色", "鮮やかな赤の音色", "はじける黄色の音色", "揺れる紫の音色");
const radio3 = getRadios("一面の星空", "ペンライトの光あふれるステージ", "大好きな自分の住む街", "笑顔あふれるテーマパーク", "何もない真っ白な景色");