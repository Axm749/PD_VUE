<template>
    <div>
   <v-container 
   style="border-radius: 20px;"
   fluid
   >


        <h1>Система хранения данных</h1>
        <br>
        <v-text-field
            outlined
            type="number"
            required
            clearable
            label="Количество устройств"
            :rules="rule"
            hide-details="auto"
            v-model.number="users"
        ></v-text-field>
        <br>
        <v-text-field
            flat
            type="number"
            required
            outlined
            clearable
            label="Дни хранения"
            :rules="rule"
            hide-details="auto"
            v-model.number="days"
        ></v-text-field>

        <v-checkbox 
        info
        hide-details
        label="Узел не стандартный?" 
        v-model="standart"
        >
        </v-checkbox>
        <v-checkbox 
        info
        hide-details
        label="Система гиперконвергентна?" 
        v-model="converg"
        >
        </v-checkbox>
        <br>
        <div v-if="standart">
        <v-text-field
            flat
            type="number"
            required
            outlined
            clearable
            label="Объём диска (Тбайт)"
            :rules="rule"
            hide-details="auto"
            v-model.number="capacity"
        ></v-text-field>
        <br>
        <v-text-field
            flat
            type="number"
            required
            outlined
            clearable
            label="Количество дисков"
            :rules="rule"
            hide-details="auto"
            v-model.number="discs"
        ></v-text-field>
        <br>
        </div>
        <v-select
            required
            v-model="options.value"
            density="comfortable"
            style="margin-top: 10px;"
            hide-details
            outlined
            :items="options"
            item-text="name"
            item-value="value"
            label="Выберите режим"
            
        ></v-select>
        <br>
        <v-text-field
            ref="mBRRef"
            required
            type="number"
            style="margin-bottom: 20px;"
            v-if="options.value=='user'"
            flat
            outlined
            clearable
            label="Мбит/сек"
            :rules="rule"
            hide-details="auto"
            v-model.number="mBR"
        ></v-text-field>
        <v-btn 
        @click="start"
        color="primary">Старт</v-btn>
        <br><br>
        <template v-if="options.value == 'video'">
            <v-dialog
                v-model="dialog"
                novalidate
				width="auto"
                :scrollable="false"
                aria-hidden="true"
            >
            <template v-slot:activator="{props}">
                <v-btn 
        max-width="100%"
        color="primary"
        v-bind="props"
        @click="getVideo"
        >
            Расширенное видеонаблюдение
        </v-btn>
            </template>
                <video1
                @cam_bitrate="getMbrVideo"
                />
            </v-dialog>
        </template>
   </v-container>
   <v-container fluid>
        <h2>Вывод для раздела системы хранения данных</h2>
        <div v-if="started">
            <p>Требуемый объём для хранения видеоданных {{volume}} TiB</p>
            <p>Требуемый объём СХД с учетом перевода TiB в Тбайт {{ volume1 }} Тбайт</p>
            <div v-if="converg">
                <p>Объём с резервным копированием {{ volume2 }}  Тбайт</p>
                <p>С учетом резерва требуемая от СХД полезная ёмкость составит {{ volume3 }} Тбайт</p> 
            </div>
            <p>Количество узлов {{ usli }}  шт</p>
            <p>Количество узлов с резервированием {{ usli+2 }}  шт</p>
        </div>
   </v-container>
    </div>
</template>

<script>

import video1 from './video1.vue';

export default {
    name: "shd_vue",
    components: {
        video1
        
    },
    data(){
        return{
        started: false,
        volume3:0,
        volume2:0,
        volume1:0,
        volume: 0,
        mBR1: 0,
        mBR: '...',
        wats: '',
        users: '...',
        usli: 0,
        days: '...',
        capacity: '...',
        discs: '...',
        standart: false,
        converg: false,
        dialog: false,
        video: false,
        rule: [
            value => !!value || 'Необходимо заполнить это поле.',
    ],
        options:[
            {name: 'Локальная вычислительная сеть', value:'local'},
            {name: 'Системы телефонии', value:'phone'},
            {name: 'Система видеонаблюдения', value:'video'},
            {name: 'Ручной режим', value:'user'}
        ]
        }
    },

    methods:{
        getMbrVideo(){
            console.log('cams_Mbr', this.mBr = localStorage.getItem('Bitrate'))
            this.video = true
            return this.mBR = localStorage.getItem('Bitrate')
        },

        getVideo(){
            if(this.dialog ===false){
				this.dialog = true
			}else{this.dialog = false}
        },

        start(){
            this.started = true
            this.getMbr()
            console.log(this.mBR1)
            this.Volume()
            this.Converg()
            this.Standart()
            this.Power()
        },

        Power(){
            if(this.converg){
                this.wats = (this.usli+2)*1000
                console.log(this.wats)
                localStorage.setItem('wats', null)
                localStorage.setItem('wats', this.wats)
                this.$emit('Power', this.wats)
            }else{
                this.wats = (this.usli+2)*700
                console.log(this.wats)
                localStorage.setItem('wats', null)
                localStorage.setItem('wats', this.wats)
                this.$emit('Power', this.wats)
            }
        },

        Volume(){
            this.volume = this.mBR1*+this.users*+this.days*3600*24
            console.log('volume', this.volume)

            this.volume = Math.ceil(this.volume/8000000);
            console.log("Рассчитанный объём в TiB:   ", this.volume);

            this.volume1 = Math.ceil(this.volume/0.85/0.9095)
            console.log("Рассчитанный объём, переведённый в Tбайт:   ",this.volume1);

        },

        Converg(){
            if(this.converg)
            {
                this.volume2 = Math.ceil(this.volume1*2)
                console.log("Объём с резервным копированием:   ", this.volume2, " Тбайт");
                this.volume3 = Math.ceil(this.volume2/0.7)
                console.log("С учетом резерва требуемая от СХД полезная", this.volume3," Тбайт");
            }
        },

        getMbr(){
            this.mBR1 = 0
            if(this.options.value == 'local'){
                this.mBR1 = 5}
            if(this.options.value == 'phone'){
                this.mBR1 = 0.1}
            if(this.options.value == 'video'){
                if(this.video){
                    this.mBR1 = this.mBR
                }else{this.mBR1 = 8}
                    }
            if(this.options.value == 'user'){
                this.mBR1 += this.mBR}
        },

        Standart(){
            if(!this.standart&&!this.converg){
                this.usli = Math.ceil(this.volume1/15/8)
                console.log("Количество узлов :   ", this.usli," шт");
                console.log("Количество узлов с резервированием:   ", this.usli+2," шт");
            }else if(!this.standart&&this.converg){
                this.usli = Math.ceil(this.volume3/7/4)
                console.log("Количество узлов :   ", this.usli," шт");
                console.log("Количество узлов с резервированием:   ", this.usli+2," шт");
            }else{
                this.usli = Math.ceil(this.volume1/+this.discs/+this.capacity)
                console.log("Количество узлов :   ", this.usli," шт");
                console.log("Количество узлов с резервированием:   ", this.usli+2," шт");
            }
        },


    },
}

</script>

<style>

.v-text-field{
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: white;
}

</style>
