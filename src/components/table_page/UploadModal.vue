<template>
  <div>
    <b-modal id="upLoad" @ok="showImg">
      <div v-if="!image">
        <h4>이미지 선택</h4>
        <b-form-file @change="onFileChange" v-model="file" accept="image/*" :state="Boolean(file)" placeholder="워터마크로 적용할 사진 선택"></b-form-file>
      </div>
      <div v-else>
        <img :src="image" class="modalImg" />
      </div>
      <div slot="modal-header" class="w-100">
        <b-button @click="removeImage">초기화</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        image: "",
        file: "",
      }
    },
    methods: {
      //상위로 이미지 전달 
      showImg: function () {
        this.$emit('show-Img', this.image);
      },
      //이미지 파일 넣는 과정 
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImage: function (e) {
        this.image = '';
      },
    }
  }

</script>

<style>
</style>
