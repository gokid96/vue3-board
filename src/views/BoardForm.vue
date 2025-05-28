<template>
    <div class="board-form">
        <h2>{{ isEdit ? '게시글 수정' : '게시글 작성' }}</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="title">제목</label>
                <input type="text" id="title" v-model="form.title" required placeholder="제목을 입력하세요">
            </div>
            <div class="form-group">
                <label for="content">내용</label>
                <textarea id="content" v-model="form.content" required placeholder="내용을 입력하세요" rows="10"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" @click="goToList" class="btn">취소</button>
                <button type="submit" class="btn submit">{{ isEdit ? '수정' : '작성' }}</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'BoardForm',
    data() {
        return {
            form: {
                title: '',
                content: ''
            },
            isEdit: false
        }
    },
    methods: {
        async fetchPost() {
            if (this.isEdit) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/posts/${this.$route.params.id}`);
                    this.form = {
                        title: response.data.title,
                        content: response.data.content
                    };
                } catch (error) {
                    console.error('게시글을 불러오는데 실패했습니다:', error);
                }
            }
        },
        async submitForm() {
            try {
                if (this.isEdit) {
                    await axios.put(`http://localhost:8081/api/posts/${this.$route.params.id}`, this.form);
                } else {
                    await axios.post('http://localhost:8081/api/posts', this.form);
                }
                this.goToList();
            } catch (error) {
                console.error('게시글 저장에 실패했습니다:', error);
            }
        },
        goToList() {
            this.$router.push('/board');
        }
    },
    created() {
        this.isEdit = this.$route.params.id !== undefined;
        if (this.isEdit) {
            this.fetchPost();
        }
    }
}
</script>

<style scoped>
.board-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
}

.form-group textarea {
    resize: vertical;
}

.form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f5f5f5;
}

.btn.submit {
    background-color: #4CAF50;
    color: white;
}
</style>
