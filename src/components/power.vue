<template>
     <div>
    <v-container fluid>
        <h1>Электропитание</h1>

        <br>
        <v-text-field
            type="number"
            outlined
            required
            clearable
            label="Напряжение аккумуляторных батарей (В)"
            :rules="rule"
            hide-details="auto"
            v-model="voultage"
        ></v-text-field>
        <br>
        <v-text-field
            type="number"
            outlined
            required
            clearable
            label="Емкость аккумуляторной батареи (А/ч)"
            :rules="rule"
            hide-details="auto"
            v-model="capacity"
        ></v-text-field>
        <br>
        <v-text-field
            type="number"
            outlined
            clearable
            required
            label="Кол-во аккумуляторных батарей в цепи (шт.)"
            :rules="rule"
            hide-details="auto"
            v-model="batteries"
        ></v-text-field>
        <br>
        <v-text-field
            type="number"
            outlined
            required
            clearable
            label="КПД преобразователя в долях (0,8 - 1,0)"
            :rules="rule"
            hide-details="auto"
            v-model="kpd"
        ></v-text-field>
        <br>
        <v-text-field
            type="number"
            :disabled="self === false "
            outlined
            clearable
            label="Макс. суммарная мощность нагрузой (Вт)"
            :rules="rule"
            hide-details="auto"
            v-model="power"
        ></v-text-field>
        <br>
        <v-checkbox 
        info
        hide-details
        label="Ввести вручную?" 
        v-model="self"
        >
        </v-checkbox>
        <br>
        <v-btn @click="start" color="primary">Старт</v-btn>
    </v-container>
    <v-container fluid>
        <h2>Вывод для раздела электропитания</h2>
        <div v-if="started">
            <p>Время работы устройства: {{ result }} ч</p>
        </div>
   </v-container>
  </div>
</template>

<script>
    export default{
        name: 'power_vue',
        data: () =>({
            voultage: '',
            power: '',
            kpd: '',
            batteries: '',
            capacity: '',
            result:0,
            self: false,
            started: false,
            rule: [
            value => !!value || 'Необходимо заполнить это поле.',
    ],
        }),

        computed:{
            
        },

        methods:{

            start(){
                
                this.started = true
                if(this.self){
                    this.result =+this.voultage*+this.capacity*+this.batteries*+this.kpd*0.85/+this.power
                    console.log("Время работы устройства:   ", this.result, " ч");
                }else{
                    this.power = ''
                    this.power = localStorage.getItem('wats')
                    this.result =+this.voultage*+this.capacity*+this.batteries*+this.kpd*0.85/+this.power
                    console.log("Время работы устройства:   ", this.result, " ч"); 
                }
            },
            getPower(){
                return this.power = localStorage.getItem('wats')
            }
        }
    }
</script>

<style>

</style>