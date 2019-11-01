[![SurvShell Logo](https://github.com/Kristina1996/surv-shell/blob/master/resources/64x64.png)](https://github.com/Kristina1996/surv-shell/)[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

[![Make a pull request][prs-badge]][prs]
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE2.md)

# Введение

Десктопное Angular, Electron, SASS приложение для создания и редактирования excel отчётов, основанное на шаблоне https://github.com/maximegris/angular-electron.git.

## Разработчикам

Для внесения правок в проект выполните следующие шаги:

* Авторизуйтесь на GitHub
* Сделайте fork репозитория (подробнее в ["About forks"](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-forks))
* Клонируйте форкнутый репозиторий на компьютер:

``` bash
git clone https://github.com/<your-github-account-name>/surv-shell.git
```

* Установите Node, если требуется
* Установите зависимости с помощью npm:

``` bash
npm install
```

* При необходимости глобально установите @angular/cli с помощью команды:

``` bash
npm install -g @angular/cli
```

* Создайте ветку типа ```issue/<issue-number>```
* Залейте изменения на GitHub и создайте pull request в [репозиторий SurvShell](https://github.com/Kristina1996/surv-shell) (Подробнее в ["Creating a pull request from a fork"](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork))

## Сборка приложения

Для сборки приложения выполните команду start:

``` bash
npm start
```
Дополнительные команды:

|Команда|Описание|
|--|--|
|`npm run ng:serve:web`| Выполняет приложение в браузере |
|`npm run build`| Сборка приложения |
|`npm run build:prod`| Сборка приложения с  Angular aot |
|`npm run electron:local`| Сборка приложения и запуск electron
|`npm run electron:linux`| Сборка приложения под linux |
|`npm run electron:windows`| Сборка приложения под Windows 32/64 bit |
|`npm run electron:mac`|  Сборка приложения и генерация файла `.app` для запуска на ОС Mac |

## Feedback

https://github.com/Kristina1996/surv-shell/issues

[license-badge]: https://img.shields.io/badge/license-Apache2-blue.svg?style=flat
[license]: https://github.com/Kristina1996/surv-shell/blob/master/LICENSE2.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
