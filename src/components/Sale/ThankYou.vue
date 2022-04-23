<template>
    <div class="d-flex flex-column container align-items-center">
        <div class="col-6 mb-3">
            <h1>THANK YOU FOR YOUR PURCHASE!</h1>
            <h1>Here is your purchase summary</h1>
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
import {computed, inject, ref} from "vue";

export default {
    name: "ThankYou",
    setup() {
        const ClearCart = inject('ClearCart');
        const cart = ref([...inject('cart').value]);

        const customer = ref({
            first_name: null,
            last_name: null,
            address: null,
            postal_number: null,
            post: null,
            email: null
        });

        const customer_preview = ref({
            first_name: null,
            last_name: null,
            address: null,
            postal_number: null,
            post: null,
            email: null
        });

        const errors = ref({
            first_name: "",
            last_name: "",
            address: "",
            postal_number: "",
            post: "",
            email: ""
        });

        const totalPriceDDV = computed(() => {
            return cart.value.reduce((prev, cur) => {
                return prev + ((cur.sale_price ?? cur.price) * cur.quantity);
            }, 0).toFixed(2)
        });

        const DDV = computed(() => {
            return (totalPriceDDV.value * 0.22).toFixed(2);
        });

        const totalPrice = computed(() => {
            return (totalPriceDDV.value - DDV.value).toFixed(2);
        });


        function DecreaseQuantity(product) {
            if(product.quantity > 0) product.quantity--
        }

        function IncreaseQuantity(product) {
            product.quantity++
        }

        function ProductImage(src) {
            if(src === null) return "images/no_photo_avail.png";
            return src;
        }

        function ResetErrors() {
            errors.value = {
                first_name: "",
                last_name: "",
                address: "",
                postal_number: "",
                post: "",
                email: ""
            };
        }

        function ValidateForm() {
            ResetErrors();

            let formIsValid = true;

            if(!customer.value.first_name) {
                errors.value.first_name = "First name is required.";
                formIsValid = false;
            }

            if(!customer.value.last_name) {
                errors.value.last_name = "Last name is required.";
                formIsValid = false;
            }

            if(!customer.value.address) {
                errors.value.address = "Address is required.";
                formIsValid = false;
            }

            // Some countries use alphanumeric postal numbers
            if(!customer.value.postal_number) {
                errors.value.postal_number = "Postal number is required..";
                formIsValid = false;
            }

            if(!customer.value.post) {
                errors.value.post = "Post is required.";
                formIsValid = false;
            }

            if(!customer.value.email) {
                errors.value.email = "E-mail is required.";
                formIsValid = false;
            }

            // copied from https://stackoverflow.com/a/46181
            else if(!String(customer.value.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                errors.value.email = "E-mail is not valid.";
                formIsValid = false;
            }

            return formIsValid;
        }

        function Submit() {
            if(!ValidateForm()) return;

            console.log("All good, submit form");

            ClearCart();
        }

        return {
            DDV,
            totalPrice,
            totalPriceDDV,
            DecreaseQuantity,
            IncreaseQuantity,
            ProductImage,
            cart,
            customer,
            customer_preview,
            Submit,
            errors
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