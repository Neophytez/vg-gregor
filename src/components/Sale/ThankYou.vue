<template>
    <div class="d-flex flex-column container align-items-center">
        <div class="col-6 mb-3">
            <h3>THANK YOU FOR THE PURCHASE!</h3>
            <h5>Below is your purchase summary</h5>
        </div>
        <div class="col-6 mb-3">
            <div class="row header">
                <div class="col-2"></div>
                <div class="col-3"></div>
                <div class="col-3 text-center">Quantity</div>
                <div class="col-2 text-end">Price</div>
                <div class="col-2 text-end">Total</div>
            </div>
        </div>
        <div v-for="product in summary"  class="col-6">
            <div class="row align-items-center">
                <div class="col-2 text-center"><img :src="ProductImage(product.image)" class="product-image" :alt="product.title"/></div>
                <div class="col-3 title">{{ product.title }}</div>
                <div class="col-3 text-center">
                    {{ product.quantity }}
                </div>
                <div class="col-2 text-end">{{ (product.sale_price ?? product.price).toFixed(2) }} €</div>
                <div class="col-2 text-end">{{ ((product.sale_price ?? product.price) * product.quantity).toFixed(2) }} €</div>
            </div>
        </div>
        <div class="col-6">
            <hr/>
        </div>
        <div class="col-6 mb-5 summary">
            <div class="row justify-content-end">
                <div class="col-4 bold">Total without VAT</div>
                <div class="col-3 text-end">{{ totalPrice }} €</div>
            </div>
            <div class="row justify-content-end">
                <div class="col-4 bold">VAT <small>(22%)</small></div>
                <div class="col-3 text-end">{{ DDV }} €</div>
            </div>
            <div class="row justify-content-end">
                <div class="col-4 bold">Total with VAT</div>
                <div class="col-3 text-end">{{ totalPriceDDV }} €</div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, ref} from "vue";

export default {
    name: "ThankYou",
    props: ['summary'],
    setup(props) {
        const summary = ref([...props.summary]);

        const totalPriceDDV = computed(() => {
            return summary.value.reduce((prev, cur) => {
                return prev + ((cur.sale_price ?? cur.price) * cur.quantity);
            }, 0).toFixed(2)
        });

        const DDV = computed(() => {
            return (totalPriceDDV.value * 0.22).toFixed(2);
        });

        const totalPrice = computed(() => {
            return (totalPriceDDV.value - DDV.value).toFixed(2);
        });

        function ProductImage(src) {
            if(src === null) return "images/no_photo_avail.png";
            return src;
        }

        return {
            DDV,
            totalPrice,
            totalPriceDDV,
            ProductImage,
        }
    }
}
</script>

<style scoped>
.header, .title {
    font-size: large;
    font-weight: 500;
}

.summary {
    font-weight: 500;
}

.product-image {
    max-height: 50px;
    max-width: 50px;
}

.bg-grey {
    background-color: #dadada;
}

.invalid {
    width: 100%;
    margin-bottom: 0.25rem;
    font-size: .875em;
    color: #dc3545;
}
</style>