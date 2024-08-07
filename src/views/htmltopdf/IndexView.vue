<template>
    <div class="table-wrapper">
        <div class="tables">
            <div class="pdf-dom">
                <div class="title">表 A.1 xxx汇总表</div>
                <table class="table" border="1" cellspacing="0">
                    <thead>
                        <tr>
                            <td>类别</td>
                            <td>商品</td>
                            <td>小计</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>T恤</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>外套</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>羽绒服</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>短袖</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>短裤</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>连衣裙</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>半身裙</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pdf-dom">
                <div class="title">表 A.2 xxx汇总表</div>
                <table class="table" border="1" cellspacing="0">
                    <thead>
                        <tr>
                            <td>类别</td>
                            <td>商品</td>
                            <td>小计</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>T恤</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>外套</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>羽绒服</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>短袖</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>短裤</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>连衣裙</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>半身裙</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="content">
            <button type="primary" @click="onExport">导出</button>
        </div>
    </div>
</template>

<script>
import { htmlToPdf } from '@/utils/htmlToPdf';

export default {
    methods: {
        async onExport() {
            await htmlToPdf('pdf-dom', '报告');
        }
    }
};
</script>

<style lang="less" scoped>
.pdf-dom {
    width: 800px;
    padding: 20px;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
        text-align: center;
    }

    .footer {
        text-align: end;
    }
}

.table {
    width: 100%;
    border: 1px solid #999;
    padding: 0;
    margin: 0;
    border-collapse: collapse;

    th {
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-bottom: 1px solid #999;
        padding: 0;
        margin: 0;
    }

    td {
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-bottom: 1px solid #999;
        padding: 0;
        margin: 0;
    }

    tr:hover {
        background-color: #f8f8f8;
    }
}
</style>
