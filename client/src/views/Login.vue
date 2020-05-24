<template>
  <div class="testQuizzes">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="8">
          <form ref="form" @submit="submit">
            <v-row>
              <v-text-field outlined v-model="question.title" label="Titre"></v-text-field>

            </v-row>

            <v-row>
              <v-btn @click.stop.prevent="addAnswer">Ajouter</v-btn>
            </v-row>

            <v-row v-for="answer in question.answers">
              <v-text-field outlined v-model="answer.label" label="Intitulé"></v-text-field>
              <v-switch v-model="answer.correct" label="Correcte"></v-switch>
            </v-row>

            <v-row>
              <v-btn type="submit">Soumettre</v-btn>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      question: {
        title: "",
        answers: []
      }
    }),
    methods: {
      addAnswer() {
        this.question.answers.push({label: "", correct: false})
      },
      submit() {
        console.log(this.question)
      }
    }
  }
</script>