const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

class HelperFunction{

    // ブランドの配列を返すメソッド
    static brandList(){
        let brandList = {};
        for (let i = 0; i < camera.length; i++){
            brandList[camera[i].brand] = camera[i].brand;
        }
        return brandList;
    }

    // 現在選択されているブランドのモデルの配列を返すメソッド
    static modelList(){
        let currBrand = document.getElementById("brand").value;
        let modelList = {};
        for (let i = 0; i < camera.length; i++){
            if(camera[i].brand === currBrand){
                modelList[camera[i].model] = camera[i].model;
            }
        }
        return modelList;
    }

    // バッテリーが使用可能かを判定するメソッド
    static canUseBattery(battery, camera, accessoryConsumption){
        return battery.endVoltage * battery.maxDraw >= camera.powerConsumptionWh + accessoryConsumption;
    }

    // 使用可能時間を計算するメソッド
    static estimateBattery(camera, battery, accessoryConsumption){
        let wh = battery.voltage * battery.capacityAh;
        let w = camera.powerConsumptionWh + accessoryConsumption;
        let hour = wh / w;
        return hour.toFixed(1);
    }

    // 現在選択されているカメラオブジェクトを返すメソッド
    static currCameraObj(){
        for (let i = 0; i < camera.length; i++){
            if (camera[i].brand === brandSelectElement.value && camera[i].model === modelSelectElement.value){
                return camera[i];
            }
        }
    }

    // step1~3を生成するメソッド
    static generateStep1To3(){
        // step1
        let step1Div = document.createElement("div");
        let step1 = document.createElement("p");
        step1.classList.add("mt-3");
        step1.innerText = "Step1: Select your brand";
        let brandSelect = document.createElement("select");
        brandSelect.id = "brand";
    
        // 選択肢を追加
        let brands = HelperFunction.brandList();
        for (let key in brands){
            let brandOption = document.createElement("option");
            brandOption.value = brands[key];
            brandOption.innerText = brands[key];
            brandSelect.append(brandOption);
        }
        
        step1Div.append(step1, brandSelect);
        target.append(step1Div);

        // step2
        let step2Div = document.createElement("div");
        let step2 = document.createElement("p");
        step2.classList.add("mt-3");
        step2.innerText = "Step2: Select your model";
        let modelSelect = document.createElement("select");
        modelSelect.id = "model";
    
        // 初期の選択肢は最初のブランドのモデル
        let models = HelperFunction.modelList();
        for (let key in models){
            let modelOption = document.createElement("option");
            modelOption.value = models[key];
            modelOption.innerHTML = models[key];
            modelSelect.append(modelOption);
        }
    
        step2Div.append(step2, modelSelect);
        target.append(step2Div);

        // step3
        let step3Div = document.createElement("div");
        let step3 = document.createElement("p");
        step3.classList.add("mt-3");
        step3.innerText = "Step3: Input accessory power consumption";
        let input = document.createElement("input");
        input.id = "accessory";
        input.type = "number";
        input.max = "100";
        input.min = "0";
        input.value = "55";

        step3Div.append(step3, input);
        target.append(step3Div);
    }
    
    // step4
    static generateStep4(){
        let step4Div = document.createElement("div");
        let step4 = document.createElement("p");
        step4.classList.add("mt-3");
        step4.innerText = "Step4: Choose your battery";
        let batteryDiv = document.createElement("div");
        batteryDiv.id = "battery";
    
        for (let i = 0; i < sortedBattery.length; i++){
            let batteryLabel = document.createElement("div");
            batteryLabel.classList.add("bg-light", "border", "border-dark", "d-flex", "justify-content-between", "p-2");
            // batteryName
            let batteryName = document.createElement("p");
            batteryName.classList.add("fw-bold");
            batteryName.innerText = sortedBattery[i].batteryName;
            // batteryEstimate
            let estimate = document.createElement("p");
            estimate.innerText = "Estimate " + HelperFunction.estimateBattery(HelperFunction.currCameraObj(), sortedBattery[i], parseInt(inputElement.value)) + " hours";
    
            batteryLabel.append(batteryName, estimate);
            batteryDiv.append(batteryLabel);
        }
    
        step4Div.append(step4, batteryDiv);
        target.append(step4Div);
    }
}

class changeFunction{

    // モデルの選択肢を更新する
    static changeModel(newModels){
        // モデルの選択肢を初期化
        modelSelectElement.innerHTML = "";
        // 選択肢を生成してappendする
        for (let key in newModels){
            let option = document.createElement("option");
            option.value = newModels[key];
            option.innerHTML = newModels[key];
            modelSelectElement.append(option);
        }
    }
    
    // バッテリーを更新する関数
    static changeBatteryLabel(){
        // 一度空にする
        batteryDiv.innerHTML = "";

        if (inputElement.value === "") return "";
    
        for (let i = 0; i < sortedBattery.length; i++){
            if (HelperFunction.canUseBattery(sortedBattery[i], HelperFunction.currCameraObj(), parseInt(inputElement.value))){
                let batteryLabel = document.createElement("div");
                batteryLabel.classList.add("bg-light", "border", "border-dark", "d-flex", "justify-content-between", "p-2");
                // batteryName
                let batteryName = document.createElement("p");
                batteryName.classList.add("fw-bold");
                batteryName.innerText = sortedBattery[i].batteryName;
                // batteryEstimate
                let estimate = document.createElement("p");
                estimate.innerText = "Estimate " + HelperFunction.estimateBattery(HelperFunction.currCameraObj(), sortedBattery[i], parseInt(inputElement.value)) + " hours";
        
                batteryLabel.append(batteryName, estimate);
                document.getElementById("battery").append(batteryLabel);
            }
    
        }
    }
}


// バッテリーをアルファベット順に並び替える
const sortedBattery = battery.slice();
sortedBattery.sort(function(a, b){
    if (a.batteryName > b.batteryName) {
        return 1;
    } else {
        return -1;
    }
})

// htmlの生成
const target = document.getElementById("target");
HelperFunction.generateStep1To3();
const brandSelectElement = document.getElementById("brand");
const modelSelectElement = document.getElementById("model");
const inputElement = document.getElementById("accessory");
HelperFunction.generateStep4();
const batteryDiv = document.getElementById("battery");

// addEventListener
// ブランドが変更されたら、モデルの選択肢を更新・バッテリーを更新する
brandSelectElement.addEventListener("change", function(){
    changeFunction.changeModel(HelperFunction.modelList(brandSelectElement.value));
    changeFunction.changeBatteryLabel();
});

// モデルが変更されたらバッテリーを更新する
modelSelectElement.addEventListener("change", function(){
    changeFunction.changeBatteryLabel();
});

// アクセサリーの消費電力が変更されたらバッテリーを更新する。
inputElement.addEventListener("change", function(){
    changeFunction.changeBatteryLabel();
});
