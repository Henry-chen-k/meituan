$.ajax({
    url:'data.json',
    method:'get',
    success:function(data){
        for(let i=0;i<data.length;i++){
        $('#food').append('<li><img src='+data[i].img+' alt=""><span>'+data[i].name+'</span><span>'+data[i].price+'</span><p>月销8148单</p><span>起送￥10元</span><span>免费送费</span><span>45分钟</span><button class="add">加入购物车</button></li>')}
    },
    dataType:'json',
    error:function(a,b,c){
        console.log('---error---qqqqq')
    }
})

//购物车页面显示
$('#shoppingCart').click(function(){
    $('#section').hide()
    $('#myShopping').show()

})
//返回点餐页面
$('.button:eq(1)').click(function(){
    $('#myShopping').hide()
    $('#section').show()
    $('.selectAll').prop('checked',false)
    $('.checkbox').prop('checked',false)
})

//加入购物车
$('#food').on('click','.add',function(){
    var flag=false;
    var index1=0;
    var name=$($(this).parent().children()).eq(1).html()
    $("#shoppingTable tr").each(function(index,element){
    if(name==element.cells[1].innerHTML){
        flag=true;
        index1=index;
    }
    })
    if(flag){
        var addNumber=$('tr:eq('+index1+')').find('.number').val()
        $('tr:eq('+index1+')').find('.number').val(Number(addNumber)+1)
    }
    else{
        $('table').append('<tr><td><input type="checkbox" class="checkbox"></td><td class="name1">'+$(this).parent().find('span').eq(0).html()+'</td><td>'+$(this).parent().find('span').eq(1).html()+'</td><td><input type="button" value="-" class="minusButton"><input type="text" value=1 class="number"><input type="button" value="+" class="addButton"></td><td><button class="deleteRow">删除</button></td></tr>')
    }
    listNumber()
})

//购物车的数量变化
function listNumber(){
    var sum=0;
    var table=$("#shoppingTable")
    $(table.find(".number")).each(function(index,element){
        sum+=Number(element.value)
    })
    $('#listNumber').html(sum)
}
//点击+增加点餐数量
$('#shoppingTable').on('click','.addButton',function(){
    var add=$(this).prev().val()
    add++
    $(this).prev().val(add)
    listNumber()
    totalPrice()
})
//点击-增加点餐数量
$('#shoppingTable').on('click','.minusButton',function(){
    var minus=$(this).next().val()
    if(minus>1){
        minus--
        $(this).next().val(minus)
    }else{
        alert("点餐数量不能小于1哦")
    }
    listNumber()
    totalPrice()
})
//编辑input框时，数量改变
$('#shoppingTable').on('change','.number',function(){
    if(this.value<=0){
        this.value=1
        alert("点餐数量不能小于1哦")
    }
    listNumber()
    totalPrice()
})
//合计的变化
function totalPrice(){
    var sum=0;
    $('.checkbox:checked').each(function(index,element){
        var td=$(element).parent();
        sum+=td.next().next().html()*td.parent().find('.number').val()
    })
    $('#count').html(sum);
}
//全选
$('.selectAll').click(function(){
    $('.checkbox').prop('checked',$('.selectAll').prop('checked'))
    totalPrice()
})
//反选
$('#shoppingTable').on('click','.checkbox',function(){
    var flag= $('.checkbox:checked').length==$('.checkbox').length
    $('.selectAll').prop('checked',flag)
    totalPrice()
})
//删除当前行
$('#shoppingTable').on('click','.deleteRow',function(){
    $(this).parent().parent().remove()
    listNumber()
    // $('.checkbox').prop('checked',$('.selectAll').prop('checked'))
    // $('.selectAll').click()
    var flag= $('.checkbox:checked').length==$('.checkbox').length
    $('.selectAll').prop('checked',flag)
})
//全部删除
$('.button:first').click(function(){
    if($('.selectAll').prop('checked')){
        $('#shoppingTable tr:gt(0)').remove()
    }
    else{
        alert("没有全部选中哦")
    }
    $('#count').html(0);
    $('.selectAll').prop('checked',false)
    listNumber()
})
//结算
$('#settleButton').click(function(){
    $('.checkbox:checked').parent().parent().remove()
    if($('#count').html()!=0){
        alert("您所购买的商品共计"+$('#count').html()+"元，请结算")
    }
    else{
        alert("您还没有选择要结算的商品哦")
    }
    $('#count').html(0);
    $('.selectAll').prop('checked',false)
    listNumber()
})


 