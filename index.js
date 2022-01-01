htmlString();

const config = {
    brandSelectElement : document.getElementById("brand"),
    modelSelectElement : document.getElementById("model"),
    inputElement : document.getElementById("accessory"),
    batteryDiv : document.getElementById("battery"),
};

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

    // カメラのブランドの配列を返すメソッド
    static brandList(){
        let brandList = {};
        for (let i = 0; i < camera.length; i++){
            brandList[camera[i].brand] = camera[i].brand;
        }
        return brandList;
    }

    // 現在選択されているブランドのモデルの配列を返すメソッド
    static modelList(){
        let currBrand = config.brandSelectElement.value;
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
    static estimateBattery(cameraobj, batteryobj, accessoryConsumption){
        let wh = batteryobj.voltage * batteryobj.capacityAh;
        let w = cameraobj.powerConsumptionWh + accessoryConsumption;
        let hour = wh / w;
        return hour.toFixed(1);
    }

    // 現在選択されているカメラオブジェクトを返すメソッド
    static currCameraObj(){
        for (let i = 0; i < camera.length; i++){
            if (camera[i].brand === config.brandSelectElement.value && camera[i].model === config.modelSelectElement.value){
                return camera[i];
            }
        }
    }

}

// step1,2,4を生成するメソッド
class Steps{

    static generateStep1(){
        // step1
        // 選択肢を追加
        let brands = HelperFunction.brandList();
        for (let key in brands){
            let brandOption = document.createElement("option");
            brandOption.value = brands[key];
            brandOption.innerText = brands[key];
            config.brandSelectElement.append(brandOption);
        }
    }

    static generateStep2(){
        // step2    
        // 選択肢を追加
        let models = HelperFunction.modelList();
        for (let key in models){
            let modelOption = document.createElement("option");
            modelOption.value = models[key];
            modelOption.innerHTML = models[key];
            config.modelSelectElement.append(modelOption);
        }
    }
    
    static generateStep4(){
        // step4
        for (let i = 0; i < sortedBattery.length; i++){
            let batteryLabel = document.createElement("div");
            batteryLabel.classList.add("bg-light", "border", "border-dark", "d-flex", "justify-content-between", "p-2");
            // batteryName
            let batteryName = document.createElement("p");
            batteryName.classList.add("fw-bold");
            batteryName.innerText = sortedBattery[i].batteryName;
            // batteryEstimate
            let estimate = document.createElement("p");
            estimate.innerText = "Estimate " + HelperFunction.estimateBattery(HelperFunction.currCameraObj(), sortedBattery[i], parseInt(config.inputElement.value)) + " hours";
    
            batteryLabel.append(batteryName, estimate);
            config.batteryDiv.append(batteryLabel);
        }
    }
}

class changeFunction{

    // モデルの選択肢を更新する
    static changeModel(nextModels){
        // モデルの選択肢を初期化
        config.modelSelectElement.innerHTML = "";
        // 選択肢を生成してappendする
        for (let key in nextModels){
            let option = document.createElement("option");
            option.value = nextModels[key];
            option.innerHTML = nextModels[key];
            config.modelSelectElement.append(option);
        }
    }
    
    // バッテリーを更新する関数
    static changeBatteryLabel(){
        // バッテリーの一覧を初期化
        config.batteryDiv.innerHTML = "";

        if (config.inputElement.value === "") return "";
    
        for (let i = 0; i < sortedBattery.length; i++){
            if (HelperFunction.canUseBattery(sortedBattery[i], HelperFunction.currCameraObj(), parseInt(config.inputElement.value))){
                let batteryLabel = document.createElement("div");
                batteryLabel.classList.add("bg-light", "border", "border-dark", "d-flex", "justify-content-between", "p-2");
                // batteryName
                let batteryName = document.createElement("p");
                batteryName.classList.add("fw-bold");
                batteryName.innerText = sortedBattery[i].batteryName;
                // batteryEstimate
                let estimate = document.createElement("p");
                estimate.innerText = "Estimate " + HelperFunction.estimateBattery(HelperFunction.currCameraObj(), sortedBattery[i], parseInt(config.inputElement.value)) + " hours";
        
                batteryLabel.append(batteryName, estimate);
                document.getElementById("battery").append(batteryLabel);
            }
        }
    }
}

function htmlString(){
    const target = document.getElementById("target");
    target.innerHTML = `
    <div class="bg-primary py-2">
        <h1 class="text-white text-center">Battery Finder Program</h1>
    </div>
    <div class="d-flex align-items-center flex-column px-3">
        <div class="col-10">
            <div id="step1">
                <p class="mt-3">Step1: Select your brand</p>
                <select name="brandSelection" id="brand"></select>
            </div>
            <div id="step2">
                <p class="mt-3">Step2: Select your model</p>
                <select name="modelSelect" id="model"></select>
            </div>
            <div id="step3">
                <p class="mt-3">Step3: Input accessory power consumption</p>
                <input type="number" name="accessoryConsumption" id="accessory" max="100" min="0" value="55">
            </div>
            <div id="step4">
                <p class="mt-3">Step4: Choose your battery</p>
                <div id="battery"></div>
            </div>
        </div>
    </div>
    `;
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
Steps.generateStep1();
Steps.generateStep2();
Steps.generateStep4();

// addEventListener
// ブランドが変更されたら、モデルの選択肢を更新・バッテリーを更新する
config.brandSelectElement.addEventListener("change", function(){
    changeFunction.changeModel(HelperFunction.modelList());
    changeFunction.changeBatteryLabel();
});

// モデルが変更されたらバッテリーを更新する
config.modelSelectElement.addEventListener("change", function(){
    changeFunction.changeBatteryLabel();
});

// アクセサリーの消費電力が変更されたらバッテリーを更新する。
config.inputElement.addEventListener("change", function(){
    changeFunction.changeBatteryLabel();
});
