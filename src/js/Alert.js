export default class Alert {
  Tempnode;
  ParentNode;

  constructor(TempNode, ParentNode) {
    this.Tempnode = TempNode;
    this.ParentNode = ParentNode;
  }

  getData() {
    return fetch("/json/Alerts.json").then((res) => res.json());
  }

  async generateAlert() {
    const data = await this.getData();

    data.forEach((item) => {
      const clone = this.Tempnode.content.cloneNode(true);
      const [section, p] = clone.querySelectorAll("section, p");

      section.style.backgroundColor = item.background;
      section.style.color = item.color;
      p.textContent = item.message;

      this.ParentNode.appendChild(clone);

      setTimeout(() => {
        this.ParentNode.innerHTML = "";
      }, 4000);
    });
  }
}
