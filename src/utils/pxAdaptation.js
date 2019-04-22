export default {
    install:function(Vue,ds = {}){
        let page_2 = ds.page || 750 / 2;
        let size = ds.size || 16;
        // 等待 vue组件渲染完成后执行
        Vue.nextTick ( function () {
            const html = global.document.querySelector('html');
            const docEl = global.document.querySelector('body');
            let ratio = ''; // 比率，进行缩放的宽度级高度
            // 元素计算值
            const run =  (num) =>{
                return num / 2 / ratio + 'px'
            }
            // 设置html字体大小 
            const pxRun =  () =>{
                ratio = page_2 / docEl.getBoundingClientRect().width;
                Vue.prototype.ddddd = docEl.getBoundingClientRect().width;
                html.style.fontSize = docEl.getBoundingClientRect().width / page_2 * size +'px';
                docEl.style.fontSize = '16px';
            }
            // 进行阿语设置
            const ar = (str) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.log('设置html标签上阿语反向');
                }
                html.style.direction= str;
            }
            // 将元素计算方式及页面缩放方法进行挂载vue原型中
            Vue.prototype.pxAdaptation = {run,pxRun,ar}; 
            window.requestAnimationFrame(pxRun);
            window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize',pxRun)
            // 自定义指令：
            var ss = Vue.directive('MT', {
                bind(el, binding, vnode) {
                    el.style.marginTop = binding.value / 2 / ratio + 'px';
                }
            });
            console.log(ss);
            Vue.directive('M', {
                bind(el, binding, vnode) {
                    // console.log(vnode)
                    if(binding.value & Array.isArray(binding.value)) {
                        switch (binding.value.lenth) {
                            case 1:
                                el.style.margin = run(binding.value) + 'px';
                                break;
                            case 2:
                                el.style.margin = run(binding.value[0]) + run(binding.value[1])
                                break;
                            case 3:
                                el.style.margin = run(binding.value[0]) + run(binding.value[1]) + run(binding.value[2]);
                                break;
                            case 4 :
                                el.style.margin = run(binding.value[0]) + run(binding.value[1]) + run(binding.value[2]) + run(binding.value[3]);
                                break;
                            default:
                                break;
                        }
                    }else if(typeof binding.value === 'number'){
                        el.style.margin = run(binding.value);
                    }
                    // el.style.marginRight = binding.value / ratio + 'px';
                },
            });
            Vue.directive('P', {
                bind(el, binding, vnode) {
                    // console.log(vnode)
                    if(binding.value & Array.isArray(binding.value)) {
                        switch (binding.value.lenth) {
                            case 1:
                                el.style.padding = run(binding.value) + 'px';
                                break;
                            case 2:
                                el.style.padding = run(binding.value[0]) + run(binding.value[1])
                                break;
                            case 3:
                                el.style.padding = run(binding.value[0]) + run(binding.value[1]) + run(binding.value[2]);
                                break;
                            case 4 :
                                el.style.padding = run(binding.value[0]) + run(binding.value[1]) + run(binding.value[2]) + run(binding.value[3]);
                                break;
                            default:
                                break;
                        }
                    }else if(typeof binding.value === 'number'){
                        el.style.padding = run(binding.value);
                    }
                    // el.style.marginRight = binding.value / ratio + 'px';
                },
            });
            Vue.directive('MR', {
                bind(el, binding, vnode) {
                    el.style.marginRight = run(binding.value);
                }
            });
            Vue.directive('MB', {
                bind(el, binding, vnode) {
                    el.style.marginBottom = run(binding.value);
                }
            });
            Vue.directive('ML', {
                bind(el, binding, vnode) {
                    el.style.marginLeft = run(binding.value);
                }
            });
            Vue.directive('PT', {
            bind(el, binding, vnode) {
                el.style.paddingTop = run(binding.value);
            }
            });
            Vue.directive('PL', {
            bind(el, binding, vnode) {
                el.style.paddingLeft = run(binding.value);
            }
            });
            Vue.directive('PR', {
            bind(el, binding, vnode) {
                el.style.paddingRight =run(binding.value);
            }
            });
            Vue.directive('PB', {
            bind(el, binding, vnode) {
                el.style.paddingBottom = run(binding.value);
            }
            });
            const myDirective = Vue.directive('W', {
            bind(el, binding, vnode) {
                el.style.width = run(binding.value);
            }
            });
            Vue.directive('H', {
                bind(el, binding, vnode) {
                    el.style.height =  run(binding.value);
                }
            });
            Vue.directive('FZ', {
                bind(el, binding, vnode) {
                    el.style.fontSize = run(binding.value);
                }
            });
            Vue.directive('TOP', {
                bind(el, binding, vnode) {
                    el.style.top = run(binding.value);
                }
            });
            Vue.directive('LEFT', {
                bind(el, binding, vnode) {
                    el.style.left = run(binding.value);
                }
            });
            Vue.directive('RIGHT', {
                bind(el, binding, vnode) {
                    el.style.right = run(binding.value);
                }
            });
            Vue.directive('BOTTOM', {
                bind(el, binding, vnode) {
                    el.style.bottom = run(binding.value);
                }
            });
        })
    }
}