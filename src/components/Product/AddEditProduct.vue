<template>
    <div class="d-flex flex-column container align-items-center">
        <div class="col-md-6 col-10">
            <h1>{{ action.toUpperCase() }} PRODUCT</h1>
        </div>
        <div class="col-md-6 col-10 mb-3">
            <label>Product name</label>
            <input v-model="product.title" class="form-control" type="text">
        </div>
        <div v-if="photo_url" class="d-flex col-md-6 col-10 justify-content-center">
            <img :src="photo_url" alt="Product photo" class="p-3 w-50"/>
        </div>
        <div class="d-flex col-md-6 col-10 justify-content-center">
            <label class="btn btn-outline-dark">
                <i class="bi bi-image"></i> Add product photo<input accept="image/png, image/jpeg" name="image" style="display: none;"
                                                                    type="file"
                                                                    @change="PreviewPhoto">
            </label>
        </div>
        <div class="col-md-6 col-10 mb-3">
            <label>Price</label>
            <input v-model="product.price" class="form-control" type="number">
        </div>
        <div class="col-md-6 col-10 mb-3">
            <label>Sale price</label>
            <input v-model="product.sale_price" class="form-control" type="number">
        </div>
        <div class="col-md-6 col-10 mb-3">
            <label>Stock</label>
            <select v-model="product.stock" class="form-select">
                <option :value="true">In stock</option>
                <option :value="false">Out of stock</option>
            </select>
        </div>
        <div class="col-md-6 col-10 mb-3">
            <label>Media type</label>
            <select v-model="product.media_type" class="form-select">
                <option value="dvd">DVD</option>
                <option value="bluray">Bluray</option>
                <option value="vhs">VHS</option>
            </select>
        </div>
        <div class="col-md-6 col-10 mb-3">
            <label>IMDB link</label>
            <input v-model="product.imdb_link" class="form-control" type="text">
        </div>
        <div class="d-flex col-md-6 col-10 justify-content-between">
            <button :disabled="disabled_save" class="btn btn-success" @click="SaveProduct"><i class="bi bi-check"></i>
                Save
            </button>
            <button v-if="action === 'edit'" class="btn btn-danger" @click="DeleteProduct(product.id)"><i
                class="bi bi-trash3"></i> Delete
            </button>
        </div>
    </div>
</template>

<script>
import {computed, inject, ref, watch} from "vue";

export default {
    name: "AddEditProduct",
    props: {
        product: {
            type: Object,
            default: null
        }
    },
    setup(props) {
        const product = ref(props.product ? {...props.product} : {
            id: null,
            title: null,
            photo: null,
            price: null,
            sale_price: null,
            stock: null,
            media_type: null,
            imdb_link: null
        });

        const action = computed(() => {
            return props.product === null ? "add" : "edit";
        })

        const photo_url = ref(null);

        const disabled_save = computed(() => {
            return !product.value.title || !product.value.price || !product.value.price || !product.value.stock || !product.value.media_type;
        })

        watch(() => props.product, (newVal) => {
            if (!newVal) product.value = {
                id: null,
                title: null,
                photo: null,
                price: null,
                sale_price: null,
                stock: null,
                media_type: null,
                imdb_link: null
            };
        });

        function PreviewPhoto(event) {
            const file = event.target.files[0];
            product.value.photo = file;
            photo_url.value = URL.createObjectURL(file);
        }

        function SaveProduct() {
            if (product.value.id) {
                UpdateProduct(product.value);
            } else {
                CreateProduct(product.value);
            }
        }

        const DeleteProduct = inject('DeleteProduct');
        const CreateProduct = inject('CreateProduct');
        const UpdateProduct = inject('UpdateProduct');

        return {
            product,
            photo_url,
            PreviewPhoto,
            DeleteProduct,
            disabled_save,
            action,
            SaveProduct
        }
    }
}
</script>

<style scoped>

</style>