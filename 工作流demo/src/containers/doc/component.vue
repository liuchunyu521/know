<script lang="tsx">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import MarkdownItVue from 'markdown-it-vue'
//import MarkdownIt from "markdown-it";
Vue.component("markdown-it-vue", MarkdownItVue);


@Component
export default class DocIndex extends Vue {
  text: string = "";
  get content(): string {
    return this.text;
  }
  @Action getDoc: any;
  async mounted() {
    let id = this.$route.params.id
    let data = await this.getDoc(id);
    // let md = new MarkdownIt({
    //   html: true,
    //   linkify: true,
    //   typographer: true
    // });
    this.text = data;
    console.log('text', this.text);
  }
  render(h: any) {
    return (
      <div>
        <markdown-it-vue class="md-body" content={this.content} />
      </div>
    );
  }
}
</script>
