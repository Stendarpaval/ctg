import Ctg from "./ctg.js";

export default function registerSettings() {
    game.settings.register(Ctg.ID, "mode", {
        scope: "world",
        config: false,
        type: String,
        default: "initiative",
        onChange: mode => {
            // Re-render the combat tracker
            ui.combat?.render(true);
            // Setup the turns again
            game.combat.setupTurns();
            // Call hook for mode update
            Hooks.call("ctgModeUpdate", mode);
        },
    });

    game.settings.register(Ctg.ID, "groupSkipping", {
        name: game.i18n.localize("ctg.settings.groupSkipping.name"),
        hint: game.i18n.localize("ctg.settings.groupSkipping.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        onChange: value => {
            ui.combat?.render(true);
            game.combat?.update({ turn: 0 });

            if (value && !game.settings.get(Ctg.ID, "sortCombatants"))
                ui.notifications.warn(`${Ctg.ID} ${game.i18n.localize("ctg.notifications.groupSkippingWorksBetterWithSorting")}`);
        },
    });

    game.settings.register(Ctg.ID, "openToggles", {
        name: game.i18n.localize("ctg.settings.openToggles.name"),
        hint: game.i18n.localize("ctg.settings.openToggles.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
    });

    game.settings.register(Ctg.ID, "sortCombatants", {
        name: game.i18n.localize("ctg.settings.sortCombatants.name"),
        hint: game.i18n.localize("ctg.settings.sortCombatants.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
    });

    game.settings.register(Ctg.ID, "onlyShowGroupsForGM", {
        name: game.i18n.localize("ctg.settings.onlyShowGroupsForGM.name"),
        hint: game.i18n.localize("ctg.settings.onlyShowGroupsForGM.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: () => {
            ui.combat?.render(true);
        },
    });

    game.settings.register(Ctg.ID, "noGroupHidden", {
        name: game.i18n.localize("ctg.settings.noGroupHidden.name"),
        hint: game.i18n.localize("ctg.settings.noGroupHidden.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: () => {
            ui.combat?.render(true);
        },
    });
};