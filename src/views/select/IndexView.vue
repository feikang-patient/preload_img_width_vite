<template>
    <el-select 
        v-model="value"
        reserve-keyword
        multiple
        placeholder="输入关键字选择"
        :remote-method="remoteMethod"
        :loading="loading"
        clearable
        filterable
        remote
    >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />

        <template #footer>
            <Pagination
                style="width: 400px"
                :small="true"
                layout="prev, pager, next"
                v-model:page="pagination.pageNum"
                v-model:size="pagination.pageSize"
                :total="total"
                @pagination="getData"
            />
        </template>
        <template #loading>
            <div v-loading="loading" element-loading-text="加载中" class="h-20"></div>
        </template>
    </el-select>
</template>
<script setup lang="ts">
import { ref, computed, onMounted} from 'vue';
// import clientApi from '@/api/client';
import { reactive } from 'vue';
import Pagination from './Pagination.vue';
const states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
];
interface ListItem {
    value: string;
    label: string;
}

const props = defineProps({
    modelValue: { type: [Array, String, Number] }
});

const pagination = reactive({
    pageNum: 1,
    pageSize: 10
});
let total = ref(0);
// const emits = defineEmits(['update:modelValue']);

// const value = computed({
//     get: () => props.modelValue,
//     set: (val) => {
//         console.log(val);
//         emits('update:modelValue', val);
//     }
// });
// const value = ref('');
const value = ref<string[]>([])

let keyword = ref('');
function getData() {
    if (keyword.value) {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
            total.value = list.value.length;
            options.value = list.value.filter((item) => {
                // return item.label.toLowerCase().includes(query.toLowerCase());
                return { value: `value:${item}`, label: `label:${item}` }
            });
        }, 200);
    }
    // clientApi
    //     .getClientList({
    //         keyword: keyword.value
    //     })
    //     .then((res: any) => {
    //         total.value = res.total;
    //         options.value = res?.list?.map((val) => ({
    //             label: `${val.name} (${val.province},${val.city}) `,
    //             value: val.id
    //         }));
    //     })
    //     .finally(() => {
    //         loading.value = false;
    //     });
}

const options = ref<ListItem[]>([]);
const loading = ref(false);
const list = ref<ListItem[]>([])
onMounted(() => {
    list.value = states.map((item) => {
        return { value: `value:${item}`, label: `label:${item}` }
    })
})
const remoteMethod = (query: string) => {
    if (query) {
        keyword.value = query;
        getData();
    } else {
        options.value = [];
    }
};
</script>

<style lang="css">
.h-20 {
    width: 200px;
    position: relative;
    top: 30px
}
</style>