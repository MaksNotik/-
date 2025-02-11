export class LegendHeroSystem extends game.system.GameSystem {
  static init() {
    // Регистрация листа персонажа
    Actors.registerSheet("legend-hero", LegendHeroCharacterSheet, {
      types: ["character"],
      makeDefault: true
    });
  }
}

class LegendHeroCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/legend-hero/templates/actors/character-sheet.html",
      width: 600,
      height: 800
    });
  }

  getData() {
    const data = super.getData();
    data.config = {
      levels: {1: "I", 2: "II", 3: "III"}
    };
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
    
    // Добавление новой силы
    html.find(".add-power").click(ev => {
      const powers = duplicate(this.actor.system.powers);
      powers.push({name: "Новая сила", level: 1});
      this.actor.update({"system.powers": powers});
    });
  }
}

Hooks.once("init", () => {
  LegendHeroSystem.init();
});